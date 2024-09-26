## To automatically switch node version add this to ~/.zshrc (using nvm)

```
#
# Run 'nvm use' automatically every time there's
# a .nvmrc file in the directory. Also, revert to default
# version when entering a directory without .nvmrc
#
nvm_autouse() {
# if [[ $PWD == $PREV_PWD ]]; then
#    return
# fi

PREV_PWD=$PWD
if [[ -f ".nvmrc" ]]; then
   nvm use
   NVM_DIRTY=true
elif [[ $NVM_DIRTY = true ]]; then
   nvm use default
   NVM_DIRTY=false
fi
}
nvm_autouse &>/dev/null
chpwd_functions=(${chpwd_functions[@]} "nvm_autouse")
```

## Configuration of steamer testing localy

Open hosts-config in vim with:

```
sudo vim /etc/host/
```

and and following line:

```
127.0.0.1 basse.com
127.0.0.1 *.basse.com
```

- represents steamer subdomain

## To get started

run `yarn env-init`
