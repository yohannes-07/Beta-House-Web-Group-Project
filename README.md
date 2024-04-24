# 🤖ICE SERVER🤖

ICE SERVER lets you to upload files, summarize lengthy files (videos, audio recordings, documents, images), and search through file systems or databases based on file content.
- Support for over 12 audio file types.
- Support for over 11 video file types.
- Support for over 17 document file types.
- Support for over 9 image file types.

  
## How it works

- Upload your chosen file for processing.
- Summarize the file (audio, video, document, image) you have uploaded:
  - The system interacts with external APIs for tasks such as vision processing, audio transcription, and summarization.
  - For example, for video files, it utilizes frame analysis and transcribed text to generate summaries.
- The teachable agent processes the summarized contents and stores them for later retrieval.
- Later, you can query the system through a chatbot interface, and it can provide results that match your search criteria.

## Examples


# Installation
 ```bash
    git clone git@github.com:StartupAgile-WIN/ICE-Server.git
 ```
 ```bash
    cd ICE-Server
 ```
  #### Linux and MAC
   ```bash
   python3 -m venv venv
   ```
   ```bash
   source venv/bin/activate
   ```
   ```bash
   pip3 install -r requirements.txt
   ```
  #### WINDOWS
  ```bash
  python -m venv venv
  ```
  ```bash
  source venv\Scripts\activate
  ```
  ```bash
  pip install -r requirements.txt
  ```

Optional: Install  Nvidia if you want to run on GPU.
 ```bash
  pip install nvidia-cublas-cu11 nvidia-cudnn-cu11
 ```

Setup OpenVoice

```bash
git clone https://github.com/myshell-ai/OpenVoice
cd OpenVoice
pip install -e .
cd ..
```
Download and extract open voice checkpoints

```bash
cd open_voice
wget https://myshell-public-repo-hosting.s3.amazonaws.com/openvoice/checkpoints_1226.zip
unzip checkpoints_1226.zip
cd ..
```
```bash
pip install --upgrade huggingface_hub
echo ICE setup done!
```

launch the server run
```bash
python3 run_fast.py
```
or
```bash
    uvicorn run_fast:app --host 0.0.0.0 --port 80
```
or 

Step 1. Allow run_server.sh to be
```bash
    chmod +x run.sh
```

Step 2. Run run_server.sh
  ```bash
      ./run.sh
  ```


 # Usage 
 
## To ensure other systems can access ICE

Step 1. Update config.json so these entries point to the actual IP.

```javascript
      "base_endpoint": "172.16.1.188",
      "base_port": "7000",
      "summarize_endpoint": "http://172.16.1.188:11434/api/generate",
```

Step 2. Update constants.js in your ICE FrontEnd application so the IP is the actual IP.

```javascript
      export const IP = "172.16.1.188";
      export const PORT = "7000";
```



