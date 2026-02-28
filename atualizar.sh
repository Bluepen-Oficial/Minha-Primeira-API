git add .
read -p "Insira a mensagem do commit: " mensagem
git commit -m "$mensagem"
git branch -M main
git push -u origin main
