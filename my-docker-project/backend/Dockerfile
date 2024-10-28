# Node.js 이미지를 기반으로 사용
FROM node:14

# 컨테이너 내에서 앱 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 파일 복사 후 의존성 설치
COPY package.json ./
RUN npm install

# 소스 코드 전체를 컨테이너로 복사
#COPY . .
COPY package.json package-lock.json ./

# 서버 포트 설정
EXPOSE 5000

# 앱 실행
CMD ["npm", "start"]

# "scripts": {
#   "start": "node app.js"
# }