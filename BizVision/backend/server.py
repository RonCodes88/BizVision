from flask import Flask, jsonify, request
from flask_cors import CORS
import base64
from gemini import process_image
import stripe
import os

app = Flask(__name__)
CORS(app, origins=["https://biz-vision.vercel.app"])  # Allow requests from your Vercel domain

@app.route('/upload-photo', methods=['POST'])
def upload_image():
    try:
        data = request.get_json()
        if 'image' not in data:
            return jsonify({"error": "No image data provided"}), 400

        image_data = data['image']
        image_data = image_data.split(",")[1]  # Remove the data URL prefix
        image_data = base64.b64decode(image_data)
        
        image_path = "BizVision/images/uploaded_image.jpg"
        os.makedirs(os.path.dirname(image_path), exist_ok=True)
        with open(image_path, "wb") as f:
            f.write(image_data)
        
        processing_result = process_image(image_path)

        return jsonify({"result": processing_result}), 200  # Return the result as JSON
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Example mapping of item names to Stripe price IDs
ITEM_PRICE_MAPPING = {
    "Swedish Massage": "price_1PjrpDKRcwQYGsherECVmfSz",
    "Deep Tissue Massage": "price_1PjrqTKRcwQYGsheOUve9v0M",
    "Hot Stone Massage": "price_1PjrsEKRcwQYGsheKgbXgxp2",
    "Sports Massage": "price_1PjrtJKRcwQYGsheS7tidI8z",
    "Aromatherapy Massage": "price_1PjruhKRcwQYGsheL7YugqNt",
}

stripe.api_key = os.getenv("BACKEND_STRIPE_API_KEY")

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    data = request.get_json()
    try:
        line_items = []
        for item in data['items']:
            price_id = ITEM_PRICE_MAPPING.get(item['name'])
            if not price_id:
                return jsonify({'error': f"Item '{item['name']}' not found"}), 400

            line_items.append({
                'price': price_id,
                'quantity': item['quantity'],
            }) 

        checkout_session = stripe.checkout.Session.create(
            line_items=line_items,
            mode='payment',
            success_url='http://localhost:5173/'+'?success=true',
            cancel_url='http://localhost:5173/'+'?canceled=true',
        )
        return jsonify({'id': checkout_session.id})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)