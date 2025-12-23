#!/bin/bash

# Configuration
MERCHANT_OID="BRB1734975000000"
STATUS="1"
TOTAL_AMOUNT="10000" # 100.00 TL
PAYMENT_TYPE="card"
HASH="dummy_hash" 

# Build the POST body
BODY="merchant_oid=$MERCHANT_OID&status=$STATUS&total_amount=$TOTAL_AMOUNT&hash=$HASH&payment_type=$PAYMENT_TYPE"

echo "Sending PayTR Callback Test to localhost..."
curl -v -X POST http://localhost:3000/api/paytr/callback \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "$BODY"

echo -e "\n\nRequest completed."
