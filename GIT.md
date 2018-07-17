# How to GitLab

### Como trabalharemos?
Utilizaremos a branch "develop" do projeto como principal para subir as atualizações. Toda modificação deve ser subida em branches separadas e apenas irem para a "develop" através de um Merge request.

### Estimativa de tasks
Vocês devem abrir as tasks com tag "Especificado", comentar a estimativa no formato `/estimate 2h` e depois trocar para a tag "Estimado"

### Como vejo as tasks a serem feitas?
1. No menu lateral esquerdo, dentro da opção "issues" acesse "board"
2. O board indica as tasks que precisam ser feitas (to do), que estão em andamento (doing) e finalizadas (done) para essa sprint.

### Como inicio o trabalho em uma task?
1. Acesse a issue que deseja trabalhar
2. Mova a task no board para "doing", basta arrastar entre as colunas
3. Selecione o botão "create merge request"
4. Faça checkout para a branch `git checkout sua-branch`

### Como envio minhas mudanças para a branch?
1. Estando na sua branch (checar com `git branch`), realize o commit `git add . && git commit -m "Mensagem sobre mudanças realizadas"`
2. Realize push com `git push origin sua-branch`

### O que faço ao terminar a task?
Realize o merge e mova a task no board de issues para a coluna de "Done"

### Quem pode aceitar os Merge Requests para a branch develop?
Qualquer pessoa pode aceitar as mudanças. Os Merge Requests são apenas para relacionar a implementação à issue criada.

### O que acontece se acabei todas minhas tasks e ainda tenho tempo para trabalhar?
Você pode pedir para adiantar alguma task ao Scrum Master, esse tempo você pode usar para deixar de trabalhar em sprints futuras, se necessário.

### O que acontece se perceber que minha task não vai ser concluída no prazo?
Você deve comunicar ao Scrum Master para que seja realizado um ajuste nas atividades e procurada uma solução alternativa.
