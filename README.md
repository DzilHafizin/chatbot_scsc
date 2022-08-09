# Chatbot for South China Sea Conflict

> USER MANUAL

### How to setup and run Frontend:
1.	Open folder name ‘Frontend’.
2.	Right click in the folder and Click ‘Open with Code’.
3.	The Visual Studio Code should be open and containing the content of ‘Frontend’ folder.
4.	Inside Visual Studio Code, open new terminal.
5.	Run this command to install the node modules: npm install. Press ‘Enter’ and wait the installation finish.
6.	After the installation finish, the frontend is setup is completed and ready to run.
7.	Run this command to run the frontend: `npm start`.

### How to setup and run Backend:
1.	Open folder name ‘Backend’.
2.	Right click in the folder and Click ‘Open with Code’.
3.	The Visual Studio Code should be open and containing the content of ‘Backend’ folder.
4.	Inside Visual Studio Code, open new terminal.
5.	Run this command to install the node modules: npm install. Press ‘Enter’ and wait the installation finish.
6.	After the installation finish, the backend is setup is completed and ready to run.
7.	Run this command to run the frontend: `nodemon server`.

### How to setup and run Chatbot:
1.	Open folder name ‘Chatbot’.
2.	Right click in the folder and Click ‘Open with Code’.
3.	The Visual Studio Code should be open and containing the content of ‘Chatbot’ folder.
4.	Inside Visual Studio Code, open new terminal.
5.	In the terminal, run this command to create conda environment: 
`conda create -n <env name>`.
6.	Then, run this command to activate conda environment:
`conda activate <env name>`.
7.	Run this command to install RASA framework in the environment: `pip install rasa`.
8.	Run this command to create RASA project: `rasa init`.
9.	Inside RASA run this command to create chatbot model: `rasa train`.
10.	After finish creating the chatbot model, run this command to activate endpoints server:
rasa run `--cors "*" --enable-api`.
11.	Open a new terminal and repeat line 6.
12.	Inside the new terminal run this command to run the chatbot actions models: 
`rasa run actions`.
