#!/bin/bash

# Hardhat node run
echo "Running hardhat node"
 
gnome-terminal -- bash -c "npx hardhat node; exec bash"

# delay
sleep 5

# Deploy contracts
echo "Deploying.."
gnome-terminal -- bash -c "npx hardhat run ./scripts/deploy.js --network localhost ; exec bash"

# delay
sleep 5

# Start Node.js server
echo "Starting Node.js server..."
gnome-terminal -- bash -c "node server.js; exec bash"

# Start React application
echo "Starting React application..."
gnome-terminal -- bash -c "npm run start; exec bash"

echo "Finished"

