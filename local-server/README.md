# Localhost Testing [<kbd>Previous Page</kbd>](../Performance_Test_Implementation/README.md)
It is good practice to have a local environment setup especially for performance testing since it is simulating making multiple vitual users call the given endpoint calls.

> [!NOTE]  
> The following instructions are meant to serve as an example to setup a basic local server environment and it does not apply to anything related to K6 Performance Testing implementation. The following content is strictly used as a reference on serving local server testing in this particular sample.

> [!IMPORTANT]  
> Developers are advised to seek other pages online for more applicable solutions to their in development applications.

## Goal:
 To establish the basics on how to make local testing for any future feature implementations.

### Localhost Setup Steps:

1. Create/Ensure there is a delicated directory for local server setup
 > [!IMPORTANT]  
 > If the virtual environment is not created here is the command: `python3 -m venv myenv`

2. In your terminal activate the virtual environment:
- On macOS and Linux: `source myenv/bin/activate` 

- On Windows (Command Prompt): `myenv\Scripts\activate` 

- On Windows (PowerShell): `.\myenv\Scripts\Activate.ps1`

3. Once the server is activated make sure these libary are installed to your personal environment:
    <p><code>pip install pandas</code><br> <code>pip install matplotlib</code></p>

4. Install the Require Packages from Terminal:
    <br><code>brew install requests</code>

6. Initialize a new Node.js project:
    <br><code>npm init -y</code>

8. Install Express:
    <br><code>npm install express</code>
    
10. Start Server:
    <br><code>node server.js</code>

12. To end the Server type <kbd>Ctrl</kbd> + <kbd>c</kbd> to end the session

## Learn More

You can learn more on how to setup `myenv` [Installing Python3 and Local Environment setup](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-local-programming-environment-on-macos).
