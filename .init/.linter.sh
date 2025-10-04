#!/bin/bash
cd /home/kavia/workspace/code-generation/recipe-planner-and-nutrition-tracker-18581-18590/recipe_finder_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

