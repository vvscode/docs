import clx.xms.client as client
import clx.xms.api as api

# Set up the credentials
service_plan_id = '48aead81ce5c478cbe534d66eb261947'
api_token = '87836ffd61b44a87a1206a54355d52a5'
endpoint = 'https://us.sms.api.sinch.com'
timeout = 30

client = client.Client(service_plan_id, api_token, endpoint, timeout)

sender_phonenumber = ''
recipients_phonenumbers = ['']
body = 'Hello, ${name}!'
parameters = {
    'name': {
        '+46722324894' : 'Amar',
        'default' : 'valued customer'
    }
}

try:
    message_params = api.MtBatchTextSmsCreate()
    message_params.sender = sender_phonenumber
    message_params.recipients = recipients_phonenumbers
    message_params.parameters = parameters
    batch = client.create_text_batch(message_params)
