import json
import matplotlib.pyplot as plt
import pandas as pd

# Load the results from the JSON file
try:
    with open('../Visualization_Results_JSON/results.json') as f:
        data = [json.loads(line) for line in f]
except FileNotFoundError:
    print("The results.json file was not found. Please check the path.")
    exit(1)
except json.JSONDecodeError as e:
    print(f"Error parsing JSON: {e}")
    exit(1)

# Initialize lists for timestamps and counts
timestamps = []
successful_counts = []
failed_counts = []

# Loop through the data to extract successful and failed calls
for entry in data:
    if entry['metric'] == 'successful_requests':
        timestamps.append(entry['data']['time'])
        successful_counts.append(entry['data']['value'])
    elif entry['metric'] == 'failed_requests':
        timestamps.append(entry['data']['time'])
        failed_counts.append(entry['data']['value'])

# Calculate total counts
total_successful = sum(successful_counts)
total_failed = sum(failed_counts)

# Print total counts
print(f"Total Successful Calls: {total_successful}")
print(f"Total Failed Calls: {total_failed}")

# Prepare data for plotting
categories = ['Successful Requests', 'Failed Requests']
values = [total_successful, total_failed]

# Create a bar plot
plt.figure(figsize=(8, 5))
plt.bar(categories, values, color=['blue', 'red'])
plt.ylabel('Count')
plt.title('Total Successful vs Failed Requests')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
