# RegExp
- `\d -> Qualquer dígito de um número [0-9]`;
- `\d{3} -> Pega números de 0 a 9 e possui 3 digitos (123, 123, 321, 564...)`;

- `^\ -> Inicio de cada linha`;
- `$ -> Fim de cada linha`;

- `[] -> Representa um **ou**, então, se nós utilizarmos [.-], estamos dizendo que queremos achar um ponto ou um hífen dentro do texto.`

### Para conseguirmos pegar esse padrão de CPF, nós podemos usar a seguinte expressão:
**CPF'S**:

>123.123.123-14;

>321.564.257-96;

>301.454.367.19;
- `^\d{3}.\d{3}.\d{3}-\d{2}$`, assim, a expressão irá bater com o **123.123.123-14** e **321.564.257-96**, mas com o **301.454.367.19** não, pois ele não tem o digito final separado pelo hífen

### CSV to JSON
**Nomes:**
>Teixeira, Guilherme

>Pereira, Fernando

>Freire, Anderson

- `\w -> Pega qualquer carácter`
- `\w+ -> Com o quantificador +, pegamos qualquer carácter até que tenha um carácter especial, algo que não seja uma letra ou um número`

- `\s -> Pega o espaço`
- `\S -> Não pega o espaço`
- `(value) -> Colocando parênteses, extraímos essa informação em um grupo`

Com isso, podemos pegar o padrão dos nomes acima e agrupar o nome antes da virgula e o nome após a vírgula, com o seguinte RegExp:
```
^(\w+),\s(\w+)$
```

Assim, ficaria agrupado da seguinte maneira:
- <span style="background-color: green">Teixeira</span><span style="background-color: blue"> ,</span><span style="background-color: orange">Guilherme</span>;
-  <span style="background-color: green">Pereira</span><span style="background-color: blue"> ,</span><span style="background-color: orange">Fernando</span>;
-  <span style="background-color: green">Freire</span><span style="background-color: blue"> ,</span><span style="background-color: orange">Anderson</span>

Quando separamos por grupo com o `()`, podemos recuperar esses dados depois utilizando índices:
- `$0`: Pesquisa inteira;
- `$1`: O primeiro parênteses;
- `$2`: O segundo parênteses.

Supondo que nós queremos transformar esses nomes em CSV em um JSON, onde o que está antes da virgula irá ser o **lastName** e o que está depois da virgula será o **firstName**.

Algo como: 
``` JSON
{
  "firstName": "Guilherme",
  "lastName": "Teixeira"
}
```

Nós podemos fazer a seguinte RegExp para capturarmos os os grupos de valores e montar esse JSON.
``` 
{"firstName": "$2", "lastName": "$1"}
```
E pronto, teremos o JSON que precisamos
```JSON
{"firstName": "Guilherme", "lastName": "Teixeira"}
{"firstName": "Fernando", "lastName": "Pereira"}
{"firstName": "Anderson", "lastName": "Freire"}
```

### Markdown para HTML
Iremos utilizar o seguinte texto em Markdown:
``` markdown
O [Guilherme](https://github.com/guilhermeais) é um garoto cheio de sonhos, **ama a [Jesus](https://www.google.com/search?q=Jesus&oq=Jesus&aqs=chrome..69i57j0i433i512j46i131i433i512j0i433i512j46i433i512j46i512j69i60j69i61.4766j0j9&sourceid=chrome&ie=UTF-8)** e **ama programar**.
Ele sonha em ser um ótimo programador e utilizar essa habilidade para impactar outras pessoas de uma maneira muito positiva!


Ah! E ele também deseja ser um ótimo guitarrista um dia, tocando é claro, na casa do Senhor. 

É isso :D!
```

E a ideia, é passar ele para **HTML**.

### Passos:
- Pegar o **titulo** do link:
  - Para isso, vamos ter que **pegar tudo o que está dentro da __bracket([])__**, já que `[]` é algo reservado do RegExp para o **ou**, vamos fazer uma pesquisa literal, utilizando o `\`, então, fazendo `\[`, buscamos de fato a string `[`, e depois, para pegarmos tudo o que está dentro da bracket, vamos utilizar o RegEx: `\[(.*?)]`. O `?` delimita o RegEx a ser aplicado somente da primeira ocorrência de bracket e separa as outras ocorrências.
- Pegar o **link**:
  - Agora, vamos pegar tudo o que está dentro de parênteses, que é onde o link se encontra.
    Então, vamos adicionar a expressão `\([http|https].*?\)`, onde, pegamos tudo o que está dentro de parênteses (tive que usar o `\` novamente, pois parênteses é utilizado para agrupar resultado, e aqui no caso nós queremos buscar o carácter de fato), depois, filtramos o `[http|https]`, dizendo que queremos buscar todas strings dentro de parênteses que conterem http ou https.
- Agora, basta nos darmos o replace desses valores, capturando corretamente os parametros e utilizando eles nas tags HTML, utilizando o regex assim: `<a href="$2" >$1</a>`
- Pegar os **negritos**:
  - É a mesma ideia do link, vamos pegar toda string dentro dos asteriscos `**`, na qual é o que o markdown utiliza para representar o negrito `\*{2}((?!\*{2}).*)\*{2}`, aqui, nós pegamos tudo o que está entre dois asteriscos e filtramos se houver mais dois asteriscos dentro.
  - E agora, vamos dar um replace com o `<b>$1<b/>`