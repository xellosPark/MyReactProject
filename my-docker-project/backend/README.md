npm init -y
npm install express http socket.io cors
npm install nodemon --save-dev

"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}

my-docker-project
├── backend
│   ├── Dockerfile
│   ├── package.json
│   ├── app.js
└── docker-compose.yml


docker-compose.yml 파일을 생성하려면 다음 단계를 따라 주세요.

프로젝트 루트 폴더 생성 및 이동:

먼저 프로젝트 루트 폴더를 생성하고 이동합니다. 예를 들어 my-docker-project라는 폴더를 만든 후 이동합니다.
mkdir my-docker-project
cd my-docker-project
backend 폴더 생성:

backend 폴더를 생성하고 이동합니다.
mkdir backend
cd backend
backend 폴더에 필요한 파일 생성:

backend 폴더 안에서 Dockerfile, package.json, app.js 파일을 생성합니다. 각 파일에 필요한 코드를 추가하세요.
루트 폴더로 돌아가 docker-compose.yml 파일 생성:

다시 my-docker-project 루트 폴더로 돌아가서 docker-compose.yml 파일을 생성합니다.

bash
코드 복사
cd ..
touch docker-compose.yml
docker-compose.yml 파일 내용 추가:

텍스트 편집기(예: VS Code, Nano 등)를 사용하여 docker-compose.yml 파일을 열고 아래 내용을 추가합니다.

yaml
코드 복사
version: '3'services:
  backend:
    build:
      context: ./backend
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/app
    environment:
      - NODE_ENV=development


New-Item -Path docker-compose.yml -ItemType File 파일을 저장하고 닫습니다.
docker-compose.yml 파일을 저장하고 닫습니다.

"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
  }


my-docker-project
├── backend
│   ├── Dockerfile
│   ├── package.json
│   ├── app.js
└── docker-compose.yml

Dockerfile을 생성하고 설정하는 방법을 단계별로 설명하겠습니다.

1. backend 폴더로 이동
터미널 또는 PowerShell에서 프로젝트 디렉터리 안의 backend 폴더로 이동합니다.

bash
코드 복사
예: cd my-docker-project/backend

2. Dockerfile 생성
Dockerfile을 생성합니다. PowerShell 또는 명령 프롬프트에서 직접 파일을 생성할 수도 있고, 파일 탐색기에서 Dockerfile 이름으로 파일을 만들어도 됩니다.

PowerShell에서 Dockerfile을 생성하려면 다음 명령어를 사용하세요:

powershell
New-Item -Path Dockerfile -ItemType File
또는 명령 프롬프트(cmd)에서 다음과 같이 파일을 생성할 수 있습니다:

cmd
type nul > Dockerfile


New-Item -Path Dockerfile -ItemType File 명령어는 PowerShell에서 새로운 파일을 생성하는 명령어입니다. 여기서 -Path는 파일의 경로를 지정하고, -ItemType File은 파일을 생성하도록 지정합니다. 이 명령어로 Dockerfile이라는 이름의 빈 파일을 생성할 수 있습니다.

# Node.js 이미지를 기반으로 사용
FROM node:14

# 컨테이너 내에서 앱 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 파일 복사 후 의존성 설치
COPY package.json ./
RUN npm install

# 소스 코드 전체를 컨테이너로 복사
COPY . .

# 서버 포트 설정
EXPOSE 5000

# 앱 실행
CMD ["npm", "start"]

프로젝트 루트(my-docker-project)에서 Docker Compose를 시작합니다
docker-compose up --build

npm start



빌드 완료 메시지 확인:

터미널에 Successfully built <image_id> 또는 Successfully tagged <image_name> 메시지가 나타나면 Docker 이미지가 성공적으로 빌드된 것입니다.
컨테이너 시작 메시지 확인:

각 서비스(예: backend)가 성공적으로 시작되면 각 컨테이너의 로그가 터미널에 표시됩니다. 예를 들어, Server running on http://localhost:5000와 같은 메시지가 출력되면 정상적으로 실행되고 있는 것입니다.
컨테이너 상태 확인:

새로운 터미널에서 다음 명령어를 사용하여 실행 중인 컨테이너 상태를 확인할 수 있습니다:

bash
코드 복사
docker ps


my-docker-project)에 .dockerignore 파일을 생성
touch .dockerignore
New-Item -Path .dockerignore -ItemType File

1. New-Item
New-Item은 PowerShell에서 새로운 항목을 생성하는 명령어입니다.
이 항목은 파일, 디렉터리(폴더), 레지스트리 키 등 다양한 유형이 될 수 있습니다.
여기서는 파일을 생성하는 데 사용됩니다.
2. -Path .dockerignore
-Path는 생성할 파일이나 폴더의 경로를 지정하는 옵션입니다.
여기서는 .dockerignore라는 이름으로 파일을 생성하려고 경로를 지정하고 있습니다.
.dockerignore는 Docker 빌드 시 불필요한 파일이나 폴더를 제외할 항목을 지정하는 파일입니다. 따라서 프로젝트 루트에 위치해야 합니다.
3. -ItemType File
-ItemType은 생성할 항목의 유형을 지정하는 옵션입니다.
File은 파일을 생성하라는 뜻입니다. 이 외에도 Directory를 사용해 폴더(디렉터리)를 생성할 수도 있습니다.
여기서는 File을 지정했기 때문에 .dockerignore라는 이름의 빈 파일이 생성됩니다.

# node_modules 폴더와 npm 디버그 로그 파일을 제외
node_modules
npm-debug.log

# 기타 불필요한 파일 및 폴더 추가
.git
.dockerignore
.DS_Store
.env


Docker 서비스가 실행 중인지 확인하려면 터미널 또는 PowerShell에서 다음 명령어를 입력하세요:
docker info

docker --version
docker-compose --version

4. Docker Compose 테스트
docker-compose.yml 파일이 있는 경우, 다음 명령어로 Docker Compose가 정상적으로 작동하는지 확인할 수 있습니다:
docker-compose up

실행 중인 컨테이너 목록 보기

docker-ps

중지된 컨테이너도 포함하여 모든 컨테이너를 보고 싶다면 -a 옵션을 추가합니다.
docker ps -a

CONTAINER ID   IMAGE          COMMAND                  CREATED        STATUS        PORTS                    NAMES
a1b2c3d4e5f6   my-image       "npm start"              2 hours ago    Up 2 hours    0.0.0.0:5000->5000/tcp   my-container
CONTAINER ID: 컨테이너의 고유 ID입니다.
IMAGE: 컨테이너가 실행 중인 Docker 이미지의 이름입니다.
COMMAND: 컨테이너가 실행 중인 명령어입니다.
CREATED: 컨테이너가 생성된 시간입니다.
STATUS: 컨테이너의 현재 상태입니다 (Up은 실행 중, Exited는 중지됨).
PORTS: 호스트와 컨테이너 간의 포트 매핑 정보입니다.
NAMES: 컨테이너의 이름입니다.
요약
docker ps: 실행 중인 컨테이너 목록만 표시.
docker ps -a: 모든 컨테이너(중지된 컨테이너 포함) 목록 표시.

