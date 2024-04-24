# 🤖ICE SERVER🤖

ICE SERVER  lets you upload files, search from file systems or databases with file content, summarize lengthy files(video, audio, doc).
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
 
# API ENDPOINTS
These endpoints allows you to interact with your chosen processor and media storage company.

### POST /datacore/s3-bucket  Add S3 Bucket
  ```
      {
        "bucket": "mybucket",
        "path": "datacore/mybucket",
        "status": "Active",
        "cron": ""0 0 * * *"",
        "config": {
                    'diarization': 'demo_1',
                    'keep_original_audio': False,
                    'model': 'base',
                    'language': None,
                    'target_language': 'english',
                    'translation_level': 'l1',
                    'tts': 'open-voice'
                  },
        "first_time": true,
        "last_scan": "",
        "job_id": "s3-job-123"
      }
  ```
  Config for FaceRecognition
  ```
        {
          'asset_id': 'asset_id',
          'model': 'VGG-Face',
          'backend': 'opencv',
          'frame_difference': 15,
          'identification_treshold': 1.2,
          'action': 'process',
        }
  ```
  Config for ObjectDetection
  ```
        {
          'items': [],
          'detection_model': 'yolov8',
          'frame_difference': 15,
          'box_treshold': 0.5,
          'text_treshold': 0.5,
        }
  ```


**Parameters**

|          Name | Required |   Type  | Description                                                                                                                                                         |
| -------------:|:--------:|:-------:| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `bucket` | required | string  | The name of the bucket you want to process.                                                                   |
|     `path`   | required | string  | The path where the  bucket is stored inside datacore.  |
|     `status` | optional | string  | Status of the bucket object. Options include "Pending", "Processing"|
|     `cron`   | optional | string  | Interval, specifc date... you want to trigger to check the datacore |
|     `config` | optional | dict    | Processor configurations you want to pass. Options include "AutoTranslation", "FacialRecognition", "ObjectDetection"   |
| `first_time` | optional | bool    | Is the bucket being processed for the first time? | 
|  `last_time` | optional | string  | When was the bucket last time processed? | 
|     `job_id` | optional | bool    | Unique identifier for the task | 

**Responses**

  ***Success***
  ```
    {"message": f"S3 Bucket added", 'data': s3_bucket}
  ```

  ***Errors***
  ```
   {
    "detail": [
      {
        "loc": [
          "string",
          0
        ],
        "msg": "Invalid cron expression",
        "type": "string"
        }
      ]
    }
  }
  ```

___

### POST /iconik/collection  Add Collection

  ```
    {
      "collection_id": "iconic/collections/myCollection",
      "status": "Active",
      "config": {

                },
      "first_time": true
    }
  ```



**Parameters**

|          Name | Required |   Type  | Description                                                                                                                                                         |
| -------------:|:--------:|:-------:| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collecton_id` | required | string  | The name of the bucket you want to process.                                                                   |
|     `status` | optional | string  | Status of the bucket object. Options include "Pending", "Processing"|
|     `config` | optional | dict    | Processor configurations you want to pass. Options include "AutoTranslation", "FacialRecognition", "ObjectDetection"   |
| `first_time` | optional | bool    | Is the bucket being processed for the first time? | 

**Responses**

  ***Success***
  ```
    {"message": f"Collection added", 'data': collection}
  ```

  ***Errors***
  ```
   {
    "detail": [
      {
        "loc": [
          "string",
          0
        ],
        "msg": "Invalid cron expression",
        "type": "string"
        }
      ]
    }
  }
  ```
___



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



