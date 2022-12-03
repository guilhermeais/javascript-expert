FOLDER_AMOUNT=4
for index in $(seq 1 $FOLDER_AMOUNT); do
  # se for 1 ou 2, cria a pasta shell01 e shell02 
  # se for 3 ou 4, cria a pasta bash01 e bash02
  folder=$([ $index -ge 3 ] && echo bash-0$index || echo shell-0$index)
  mkdir -p $folder
  cd $(pwd)/$folder 
  npm init -y --silent --scope @guilhermeais > /dev/null
  cat package.json | jq '{name: .name, version: .version}'
  cd ..
done

rm -rf bash* shell*