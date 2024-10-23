import json
import matplotlib.pyplot as plt
import pandas as pd

# Load the results from the JSON file
try:
    with open('/Users/juston/Desktop/Personal Cover Letter Portfollio/k6_Basic_Implementation/Performance_Test_Graphing/Visualization_Results_JSON/results.json') as f:
        # Read the file line by line and parse each JSON object
        data = [json.loads(line) for line in f]
except FileNotFoundError:
    print("The results.json file was not found. Please check the path.")
    exit(1)
except json.JSONDecodeError as e:
    print(f"Error parsing JSON: {e}")
    exit(1)

# Extract relevant metrics
timestamps = []
fail_rates = []

# Loop through the data to find relevant metrics
for entry in data:
    if entry['metric'] == 'failed_requests':
        # Print the entry for debugging
        print(entry)  # Show the structure of the entry
        if 'data' in entry and 'time' in entry['data']:
            timestamps.append(entry['data']['time'])
            fail_rates.append(entry['data']['value'])
        else:
            print("Entry does not have 'data' or 'time':", entry)

# Check if we have any data to plot
if not timestamps or not fail_rates:
    print("No failed request data found.")
    exit(1)

# Create a DataFrame for easier handling
df = pd.DataFrame({
    'Time': pd.to_datetime(timestamps),  # Convert timestamps to datetime
    'Failed Request Rate': fail_rates
})

# Plot the results
plt.figure(figsize=(12, 6))
plt.plot(df['Time'], df['Failed Request Rate'], label='Failed Requests Rate', color='red')
plt.xlabel('Time')
plt.ylabel('Failure Rate')
plt.title('HTTP Request Failure Rate Over Time')
plt.xticks(rotation=45)
plt.legend()
plt.tight_layout()
plt.show()
