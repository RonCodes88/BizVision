# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()
# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = os.getenv('TWILIO_AUTH_TOKEN')
client = Client(account_sid, auth_token)

def call_emergency_contact():
    call = client.calls.create(
        from_="+19065694416", to=os.getenv('PHONE_NUMBER'), url="http://demo.twilio.com/docs/voice.xml",
    )
    print(call.sid)


