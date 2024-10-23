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

# Initialize lists for timestamps and counts
timestamps = []
successful_counts = []
failed_counts = []

# Loop through the data to extract successful and failed calls
for entry in data:
    if entry['metric'] == 'successful_calls':
        timestamps.append(entry['data']['time'])
        successful_counts.append(entry['data']['value'])
    elif entry['metric'] == 'failed_calls':
        timestamps.append(entry['data']['time'])
        failed_counts.append(entry['data']['value'])

# Calculate total counts
total_successful = sum(successful_counts)
total_failed = sum(failed_counts)

# Print total counts
print(f"Total Successful Calls: {total_successful}")
print(f"Total Failed Calls: {total_failed}")

# Create a DataFrame for easier handling
df = pd.DataFrame({
    'Time': timestamps,
    'Successful Calls': successful_counts,
    'Failed Calls': failed_counts
})

# Convert the 'Time' column to datetime
df['Time'] = pd.to_datetime(df['Time'])

# Set the Time as the index for easier plotting
df.set_index('Time', inplace=True)

# Plotting the results
plt.figure(figsize=(12, 6))
bar_width = 0.35
x = range(len(df))

# Create bar plots for successful and failed calls
plt.bar(x, df['Successful Calls'], width=bar_width, color='blue', label='Successful Calls')
plt.bar([p + bar_width for p in x], df['Failed Calls'], width=bar_width, color='red', label='Failed Calls')

plt.xlabel('Time')
plt.ylabel('Count')
plt.title('Count of Successful vs Failed Calls Over Time')
plt.xticks([p + bar_width / 2 for p in x], df.index.strftime('%Y-%m-%d %H:%M:%S'), rotation=45)
plt.legend()
plt.tight_layout()
plt.show()
