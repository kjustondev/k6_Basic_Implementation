import json
import pandas as pd
import matplotlib.pyplot as plt

# Load the results from the JSON file
data = {
    "successful_calls": [],
    "failed_calls": [],
    "time": []
}

try:
    with open('/Users/juston/Desktop/Personal Cover Letter Portfollio/k6_Basic_Implementation/Performance_Test_Graphing/Visualization_Results_JSON/results.json') as f:
        for line in f:
            entry = json.loads(line)
            metric = entry['metric']
            time = entry['data']['time']
            value = entry['data']['value']
            
            if metric == 'successful_requests':
                data['successful_calls'].append(value)
                data['failed_calls'].append(0)  # No failed calls for this entry
            elif metric == 'failed_requests':
                data['failed_calls'].append(value)
                data['successful_calls'].append(0)  # No successful calls for this entry
            data['time'].append(time)

except FileNotFoundError:
    print("The results.json file was not found. Please check the path.")
    exit(1)
except json.JSONDecodeError as e:
    print(f"Error parsing JSON: {e}")
    exit(1)

# Create a DataFrame from the data
df = pd.DataFrame(data)

# Convert 'time' column to datetime
df['time'] = pd.to_datetime(df['time'])

# Set 'time' as the index
df.set_index('time', inplace=True)

# Plotting the results
plt.figure(figsize=(12, 6))
plt.plot(df.index, df['successful_calls'], label='Successful Calls', color='blue', marker='o')
plt.plot(df.index, df['failed_calls'], label='Failed Calls', color='red', marker='x')

# Adding titles and labels
plt.title('Successful vs Failed Calls Over Time')
plt.xlabel('Time')
plt.ylabel('Number of Calls')
plt.legend()
plt.xticks(rotation=45)  # Rotate x-axis labels for better visibility
plt.tight_layout()  # Adjust layout to make room for labels
plt.grid()  # Optional: Add grid for better readability

# Show the plot
plt.show()
