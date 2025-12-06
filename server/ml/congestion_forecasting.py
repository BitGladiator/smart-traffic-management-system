import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error
import matplotlib.pyplot as plt
import joblib
import os

class CongestionForecaster:
    def __init__(self, sequence_length=24):
        self.sequence_length = sequence_length
        self.model = None
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        self.model_path = 'congestion_forecast_model.h5'
        self.scaler_path = 'congestion_forecast_scaler.pkl'

    def generate_sample_data(self, n_samples=1000):
        """Generate sample time series congestion data"""
        np.random.seed(42)

        # Generate time series
        timestamps = pd.date_range(start='2023-01-01', periods=n_samples, freq='H')

        # Base congestion pattern (hourly variation)
        hours = timestamps.hour.values
        days_of_week = timestamps.dayofweek.values

        # Base congestion with daily and weekly patterns
        base_congestion = 30 + 20 * np.sin(2 * np.pi * hours / 24)  # Daily cycle

        # Weekday vs weekend
        weekday_multiplier = np.where(days_of_week < 5, 1.5, 1.0)
        base_congestion *= weekday_multiplier

        # Rush hours
        rush_hour_boost = np.where(
            ((hours >= 7) & (hours <= 9)) | ((hours >= 17) & (hours <= 19)),
            1.5, 1.0
        )
        base_congestion *= rush_hour_boost

        # Add random events (accidents, events)
        event_probability = 0.05
        events = np.random.choice([0, 1], n_samples, p=[1-event_probability, event_probability])
        event_multiplier = np.where(events == 1, np.random.uniform(1.5, 2.5, n_samples), 1.0)
        base_congestion *= event_multiplier

        # Add noise
        congestion = base_congestion + np.random.normal(0, 5, n_samples)
        congestion = np.clip(congestion, 0, 100)

        data = pd.DataFrame({
            'timestamp': timestamps,
            'congestion_level': congestion,
            'hour': hours,
            'day_of_week': days_of_week
        })

        return data

    def create_sequences(self, data):
        """Create sequences for LSTM training"""
        scaled_data = self.scaler.fit_transform(data.reshape(-1, 1))

        X, y = [], []
        for i in range(len(scaled_data) - self.sequence_length):
            X.append(scaled_data[i:(i + self.sequence_length), 0])
            y.append(scaled_data[i + self.sequence_length, 0])

        X = np.array(X)
        y = np.array(y)

        # Reshape X for LSTM [samples, time steps, features]
        X = X.reshape((X.shape[0], X.shape[1], 1))

        return X, y

    def build_model(self):
        """Build the LSTM model"""
        self.model = Sequential([
            LSTM(50, activation='relu', input_shape=(self.sequence_length, 1), return_sequences=True),
            Dropout(0.2),
            LSTM(50, activation='relu'),
            Dropout(0.2),
            Dense(1)
        ])

        self.model.compile(optimizer='adam', loss='mse')

    def train_model(self, X_train, y_train, epochs=50, batch_size=32, validation_split=0.2):
        """Train the LSTM model"""
        early_stopping = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)

        history = self.model.fit(
            X_train, y_train,
            epochs=epochs,
            batch_size=batch_size,
            validation_split=validation_split,
            callbacks=[early_stopping],
            verbose=1
        )

        return history

    def evaluate_model(self, X_test, y_test):
        """Evaluate the model performance"""
        y_pred = self.model.predict(X_test)

        # Inverse transform predictions and actual values
        y_test_inv = self.scaler.inverse_transform(y_test.reshape(-1, 1))
        y_pred_inv = self.scaler.inverse_transform(y_pred)

        mse = mean_squared_error(y_test_inv, y_pred_inv)
        mae = mean_absolute_error(y_test_inv, y_pred_inv)

        print(f"Mean Squared Error: {mse:.2f}")
        print(f"Mean Absolute Error: {mae:.2f}")

        return mse, mae

    def forecast_congestion(self, historical_data, forecast_steps=24):
        """Forecast future congestion levels"""
        if self.model is None:
            raise ValueError("Model not trained. Please train the model first.")

        # Scale historical data
        scaled_data = self.scaler.transform(historical_data.reshape(-1, 1))

        # Prepare input sequence
        input_sequence = scaled_data[-self.sequence_length:].reshape(1, self.sequence_length, 1)

        forecast = []
        for _ in range(forecast_steps):
            # Predict next value
            next_value = self.model.predict(input_sequence, verbose=0)[0][0]

            # Append to forecast
            forecast.append(next_value)

            # Update input sequence
            input_sequence = np.roll(input_sequence, -1, axis=1)
            input_sequence[0, -1, 0] = next_value

        # Inverse transform forecast
        forecast = np.array(forecast).reshape(-1, 1)
        forecast_inv = self.scaler.inverse_transform(forecast)

        return forecast_inv.flatten()

    def save_model(self):
        """Save the trained model and scaler"""
        if self.model is None:
            raise ValueError("Model not trained. Please train the model first.")

        self.model.save(self.model_path)
        joblib.dump(self.scaler, self.scaler_path)
        print(f"Model saved to {self.model_path}")

    def load_model(self):
        """Load the trained model and scaler"""
        if not os.path.exists(self.model_path) or not os.path.exists(self.scaler_path):
            raise FileNotFoundError("Model files not found. Please train and save the model first.")

        self.model = tf.keras.models.load_model(self.model_path)
        self.scaler = joblib.load(self.scaler_path)
        print(f"Model loaded from {self.model_path}")

def main():
    """Main function to train and test the model"""
    forecaster = CongestionForecaster(sequence_length=24)

    # Generate sample data
    print("Generating sample data...")
    data = forecaster.generate_sample_data(1000)
    congestion_values = data['congestion_level'].values
    print(f"Generated {len(congestion_values)} samples")

    # Create sequences
    print("Creating sequences...")
    X, y = forecaster.create_sequences(congestion_values)

    # Split data
    split_index = int(0.8 * len(X))
    X_train, X_test = X[:split_index], X[split_index:]
    y_train, y_test = y[:split_index], y[split_index:]

    # Build model
    print("Building model...")
    forecaster.build_model()

    # Train model
    print("Training model...")
    history = forecaster.train_model(X_train, y_train)

    # Evaluate model
    print("Evaluating model...")
    mse, mae = forecaster.evaluate_model(X_test, y_test)

    # Save model
    forecaster.save_model()

    # Example forecast
    historical_data = congestion_values[-24:]  # Last 24 hours
    forecast = forecaster.forecast_congestion(historical_data, forecast_steps=12)
    print(f"12-hour congestion forecast: {forecast}")

if __name__ == "__main__":
    main()
