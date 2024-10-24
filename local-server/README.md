# Localhost Testing
Before any Performance Testing needed to be done please setup an local environment to simulate any endpoint calls.

> [!NOTE]  
> The following instructions are meant to serve as an example to setup a basic local server environment and it does not apply to anything related to K6 Performance Testing implementation. The following content is strictly used as a reference on serving local server testing in this particular sample.

> [!IMPORTANT]  
> Developers are advised to seek other pages online for more applicable solutions to their in development applications.

## Purpose:
 To establish the basics on how to make local testing.

### Localhost Setup Steps:

1. Create/Ensure there is a delicated directory for local server setup
    > [!IMPORTANT]  
    > If the virtual environment is not created here is the command: `python3 -m venv myenv`

2. In your terminal activate the virtual environment:
- On macOS and Linux: `source myenv/bin/activate` 

- On Windows (Command Prompt): `myenv\Scripts\activate` 

- On Windows (PowerShell): `.\myenv\Scripts\Activate.ps1`

3. Once the server is activated make sure these libary are installed to your personal environment:
    >`pip install pandas`
    <br> 
    >`pip install matplotlib`

4. Install the Require Packages from Terminal:
    >`brew install requests`

5. Initialize a new Node.js project:
    >`npm init -y`

6. Install Express:
    >`npm install express`

7. Start Server:
    >`node server.js`

8. To end the Server type <kbd>Ctrl</kbd> + <kbd>c</kbd> to end the session

## Learn More

You can learn more on how to setup `myenv` [Installing Python3 and Local Environment setup](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-local-programming-environment-on-macos).