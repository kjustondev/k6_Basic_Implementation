import json
import matplotlib.pyplot as plt
import pandas as pd

# Load the results from the JSON file
with open('/Users/juston/Desktop/Personal Cover Letter Portfollio/k6_Basic_Implementation/Performance_Test_Graphing/Visualization_Results_JSON/results.json') as f:
    data = json.load(f)

# Extract relevant metrics
timestamps = []
fail_rates = []

for point in data['metrics']['failed_requests']['values']:
    timestamps.append(point['timestamp'])
    fail_rates.append(point['rate'])

# Create a DataFrame for easier handling
df = pd.DataFrame({
    'Time': timestamps,
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
