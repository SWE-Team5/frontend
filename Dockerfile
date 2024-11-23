# Step 1: Node.js LTS 버전을 사용한 베이스 이미지
FROM node:18

# Step 2: 컨테이너 내 작업 디렉토리 설정
WORKDIR /app

# Step 3: package.json과 package-lock.json 복사
COPY package*.json ./

# Step 4: 의존성 설치
RUN npm install

# Step 5: 프로젝트 파일 복사
COPY . .

# Step 6: 컨테이너가 사용할 포트 설정
EXPOSE 3000

# Step 7: React 앱 실행
CMD ["npm", "start"]