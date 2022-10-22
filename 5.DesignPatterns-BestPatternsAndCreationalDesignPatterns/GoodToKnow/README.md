# DesignPattern e Anti-Pattern
**Design Pattern** é uma solução geral e reutilizável utilizado para resolver um problema recorrente.
Um **Anti-Pattern** são soluções que resolvem o problema, mas não são eficazes e podem até trazer mais malefícios do que benefícios, como:

- **Over Engineering**: Solução muito complexa para um problema simples;
- **Big Ball of Mud**: Código muito acoplado, difícil de manter, qualquer alteração pode quebrar tudo;


## Design Patterns
- **DRY**: Don't Repeat Yourself;
  Basicamente, não repetir código, pois isso pode gerar problemas de manutenção; então se você tem um código que faz algo, e você precisa fazer o mesmo em outro lugar, você pode criar uma função para isso, e chamar a função onde for necessário, assim, evitando manutenção em vários lugares com o mesmo comportamento.
- **KISS**: Keep It Simple, Stupid;
  Basicamente, manter as coisas simples, não complicar demais, pois isso pode gerar problemas de manutenção;
- **YAGNI**: You Ain't Gonna Need It;
  Basicamente, não criar coisas que você não vai precisar, pois isso pode gerar problemas de manutenção;