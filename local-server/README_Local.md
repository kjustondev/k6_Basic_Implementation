# Localhost Testing
Before any Performance Testing needed to be done please setup an local environment to simulate any endpoint calls.

> [!NOTE]  
> The following instructions are meant to serve as an example to setup a basic local server environment and it does not apply to anything related to K6 Performance Testing implementation. The following content is strictly used as a reference on serving local server testing in this particular sample.

> [!IMPORTANT]  
> Developers are advised to seek other pages online for more applicable solutions to their in development applications.

## Purpose:
 - To establish the basics on how to make local testing.


### Preliminary steps:

1. Create/Ensure there is a delicated directory for local server setup

2. In your terminal activate the virtual environment:
- On macOS and Linux: `source myenv/bin/activate` 

- On Windows (Command Prompt): `myenv\Scripts\activate` 

- On Windows (PowerShell): `.\myenv\Scripts\Activate.ps1`


3. Install the Require Packages from Terminal:
    >`brew install requests`

4. Initialize a new Node.js project:
    >`npm init -y`

5. Install Express:
    >`npm install express`

6. Start Server:
    >`node server.js`

7. To end the Server type <kbd>Ctrl</kbd> + <kbd>c</kbd> to end the session