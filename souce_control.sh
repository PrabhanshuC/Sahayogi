git pull origin main

git add .

echo "Commit message: "
read commit_message

git commit -m "$commit_message"

git push origin dev
