import PIL.Image
import os
from dotenv import load_dotenv
import google.generativeai as genai
from EmergencyContact import call_emergency_contact

load_dotenv()
prompt = """Imagine you are a friendly and helpful personal assistant for a blind person who is a store owner. 
You are describing the customer, focusing on providing details that help the blind person 
identify a customer's needs based on their emotions, appearance, gender, and approximate age.
without using the words 'image, photo, camera, or description'.
Also, provide relevant details that help the blind person understand the situation
which potentially helps gain profit or avoid loss.
Don't say something like he/she appears to be in a safe environment, just say whether the environment/situation is safe.
While focusing on speaking in a helpful tone, keep it concise and informative.
Don't be too sensitive, if the image appears to have someone like a thief or (fire, tornado, earthquake, etc..), start response by saying 'Alert!', 
describe what kind of dangerous situation in one or two sentence then say 'I am now calling your emergency contact'"""

gemini_api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=gemini_api_key)

def process_image(image_path):
    # Add your image processing code here
    print(f"Processing image: {image_path}")
    img = PIL.Image.open(image_path)
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content([prompt, img], stream=False)
    print(response.text)
    if "Alert!" in response.text:
        call_emergency_contact()
    return response.text




