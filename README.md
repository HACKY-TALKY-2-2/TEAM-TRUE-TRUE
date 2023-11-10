# TEAM-TRUE-TRUE

## 1. 주제 선정 배경
이 프로젝트는 역삼역을 생각하며 지하철 노선도에서 영감을 얻었습니다. 지하철 노선도와 Git-Graph의 유사성에 착안하여, 프로젝트의 PR 내역을 기반으로 개인별 노선을 만들기로 했습니다. 각각의 PR을 지하철 역으로 설정하고, 해당 역의 정보를 통해 프로젝트의 진행 상황을 시각화하는 방식으로 재미와 효율성을 더하고자 했습니다. 이러한 아이디어로 프로젝트를 시작하게 되었습니다.

## 2. 구현 방법
PR 정보 수집: 원하는 레포지토리의 Pull Request(PR) 정보를 REST API를 사용하여 수집합니다.
역 생성: 수집된 PR 정보를 바탕으로 각 PR을 하나의 '역'으로 구상하고 생성합니다.
노선 좌표 설정 및 표시: 서버에서 개인별 노선의 좌표를 받아와 해당 좌표에 지하철 역을 표시합니다.
이 과정을 통해 개발자 각자의 기여도와 프로젝트의 전반적인 흐름을 한눈에 볼 수 있는 독특하고 직관적인 방식의 시각화를 구현하였습니다.

## 3. 시연 화면
<img width="1053" alt="Screenshot 2023-11-11 at 08 29 52" src="https://github.com/HACKY-TALKY-2-2/TEAM-TRUE-TRUE/assets/93732046/08fdc7a3-3de0-4870-a64c-86b1a62535a3">
<img width="971" alt="Screenshot 2023-11-11 at 08 29 48" src="https://github.com/HACKY-TALKY-2-2/TEAM-TRUE-TRUE/assets/93732046/0e2467a6-d1e9-4d93-a4d2-57cd40040f9e">
<img width="999" alt="Screenshot 2023-11-11 at 08 29 41" src="https://github.com/HACKY-TALKY-2-2/TEAM-TRUE-TRUE/assets/93732046/2f936c98-a3ea-430d-8fe7-338958898366">
<img width="1108" alt="Screenshot 2023-11-11 at 08 29 37" src="https://github.com/HACKY-TALKY-2-2/TEAM-TRUE-TRUE/assets/93732046/4a77f092-a0c2-4dc7-9325-01e3ff5edbc4">



