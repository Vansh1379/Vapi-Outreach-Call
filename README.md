# VAPI Outreach Call Agent

AI-powered automated outbound calling system using VAPI.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure `.env`:
```env
VAPI_TOKEN=your_vapi_token
ASSISTANT_ID=your_assistant_id
PHONE_NUMBER_ID=your_phone_number_id
PORT=3000
```

3. Start server:
```bash
npm start
```

## API Endpoints

### Make Outbound Call
**POST** `/api/calls/outbound`
```json
{
  "customerNumber": "+919876543210"
}
```

### Get Call Details
**GET** `/api/calls/:callId`

### List All Calls
**GET** `/api/calls`

### API Info
**GET** `/api`

## Screenshots

### Outbound Call
![Outbound Call](ss/outBoundCall.png)

### Call Details
![Call Details](ss/callID.png)

### All Calls
![All Calls](ss/allCalls.png)
