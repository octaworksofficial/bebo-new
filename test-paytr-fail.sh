#!/bin/bash

# Configuration
MERCHANT_OID="BRB_TEST_FAIL_$(date +%s)"
STATUS="0" # 0 means Failed
TOTAL_AMOUNT="15000"
PAYMENT_TYPE="card"
HASH="dummy_hash"
FAILED_CODE="99"
FAILED_MSG="Bakiyeniz yetersiz - Test Failure"

# We first need a valid order in the DB for the callback to update. 
# Since we can't easily create one via CURL without authentication, 
# this test assumes an order with this MERCHANT_OID exists or we just rely on the log confirming "Order not found" treated as handled.
# Ideally, we would create an order first.

# Build the POST body
BODY="merchant_oid=$MERCHANT_OID&status=$STATUS&total_amount=$TOTAL_AMOUNT&hash=$HASH&payment_type=$PAYMENT_TYPE&failed_reason_code=$FAILED_CODE&failed_reason_msg=$FAILED_MSG"

echo "Sending PayTR FAILURE Callback to localhost..."
curl -v -X POST http://localhost:3000/api/paytr/callback \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "$BODY"

echo -e "\n\nRequest sent."
