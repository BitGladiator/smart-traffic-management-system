import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
import joblib
import os


class TrafficLoadPredictor:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.model_path = 'traffic_load_model.pkl'
        self.scaler_path = 'traffic_load_scaler.pkl'

    def generate_sample_data(self, n_samples=1000):
        """Generate sample traffic data for training"""
        np.random.seed(42)

        hours = np.random.randint(0, 24, n_samples)
        days_of_week = np.random.randint(0, 7, n_samples)
        weather_conditions = np.random.randint(0, 4, n_samples)
        temperature = np.random.uniform(0, 40, n_samples)
        is_holiday = np.random.choice([0, 1], n_samples, p=[0.9, 0.1])

        base_load = 30
        rush_hour_multiplier = np.where(
            ((hours >= 7) & (hours <= 9)) | ((hours >= 17) & (hours <= 19)),
            2.0,
            1.0
        )
        weekday_multiplier = np.where(days_of_week < 5, 1.5, 1.0)
        weather_multiplier = np.where(weather_conditions == 0, 1.0,
                                      np.where(weather_conditions == 1, 1.2,
                                               np.where(weather_conditions == 2, 1.5, 1.8)))
        holiday_multiplier = np.where(is_holiday == 1, 0.7, 1.0)

        traffic_load = base_load * rush_hour_multiplier * weekday_multiplier * weather_multiplier * holiday_multiplier
        traffic_load = np.clip(traffic_load + np.random.normal(0, 5, n_samples), 0, 100)

        data = pd.DataFrame({
            'hour': hours,
            'day_of_week': days_of_week,
            'weather_condition': weather_conditions,
            'temperature': temperature,
            'is_holiday': is_holiday,
            'traffic_load': traffic_load
        })

        return data

    def preprocess_data(self, data):
        """Preprocess the data for training"""
        X = data.drop('traffic_load', axis=1)
        y = data['traffic_load']
        X_scaled = self.scaler.fit_transform(X)
        return X_scaled, y

    def train_model(self, X_train, y_train):
        """Train the Random Forest model"""
        self.model = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)
        self.model.fit(X_train, y_train)

    def evaluate_model(self, X_test, y_test):
        """Evaluate the model performance"""
        y_pred = self.model.predict(X_test)
        mse = mean_squared_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        print(f"Mean Squared Error: {mse:.2f}")
        print(f"R² Score: {r2:.2f}")
        return mse, r2

    def predict_traffic_load(self, features):
        """Predict traffic load for given features"""
        if self.model is None:
            raise ValueError("Model not trained.")
        features = np.array(features).reshape(1, -1)
        features_scaled = self.scaler.transform(features)
        prediction = self.model.predict(features_scaled)[0]
        return np.clip(prediction, 0, 100)

    def save_model(self):
        """Save the trained model and scaler"""
        if self.model is None:
            raise ValueError("Model not trained.")
        joblib.dump(self.model, self.model_path)
        joblib.dump(self.scaler, self.scaler_path)
        print(f"Model saved to {self.model_path}")

    def load_model(self):
        """Load the trained model and scaler"""
        if not os.path.exists(self.model_path) or not os.path.exists(self.scaler_path):
            raise FileNotFoundError("Model files not found.")
        self.model = joblib.load(self.model_path)
        self.scaler = joblib.load(self.scaler_path)
        print(f"Model loaded from {self.model_path}")


def main():
    predictor = TrafficLoadPredictor()

    print("Generating sample data...")
    data = predictor.generate_sample_data(1000)
    print(f"Generated {len(data)} samples")

    print("Preprocessing data...")
    X, y = predictor.preprocess_data(data)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Training model...")
    predictor.train_model(X_train, y_train)

    print("Evaluating model...")
    predictor.evaluate_model(X_test, y_test)

    predictor.save_model()

    sample_features = [8, 1, 0, 25, 0]
    prediction = predictor.predict_traffic_load(sample_features)
    print(f"Predicted traffic load for sample features: {prediction:.2f}")


if __name__ == "__main__":
    main()