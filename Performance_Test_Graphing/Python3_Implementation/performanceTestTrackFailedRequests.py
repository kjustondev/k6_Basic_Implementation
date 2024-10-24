import json
from datetime import datetime

# Initialize counters
failed_requests = 0
successful_requests = 0  # Add this line

# Simulated function to count failed requests
def count_failed_requests():
    global failed_requests
    failed_requests += 1  # Increment for demonstration purposes

def count_successful_requests():
    global successful_requests
    successful_requests += 1  # Increment for demonstration purposes

def create_metric_entry(metric_name, value):
    return {
        "metric": metric_name,
        "type": "Point",
        "data": {
            "time": datetime.now().isoformat(),
            "value": value,
            "tags": {}
        }
    }

# Simulate counting requests
for _ in range(10):  # Simulate 10 failed requests
    count_failed_requests()

for _ in range(20):  # Simulate 20 successful requests
    count_successful_requests()

# Prepare the results in the specified format
results = []

# Add metrics for successful and failed requests
results.append(create_metric_entry("successful_requests", successful_requests))
results.append(create_metric_entry("failed_requests", failed_requests))

# Write results to a JSON file in the specified directory
with open('../Visualization_Results_JSON/results.json', 'w') as f:
    for entry in results:
        f.write(json.dumps(entry) + '\n')

print("Results written to results.json")