
IAFE AGRO — Pacote para publicação (Vercel) e Guia de Apontamento do Domínio
==========================================================================

Arquivos incluídos:
- /public/logo.png    (logo enviada)
- /public/favicon.png (favicon gerado automaticamente)
- /src/*              (código React + Tailwind)
- index.html
- package.json
- vite.config.js
- tailwind.config.cjs
- README_GUIDE.md    (este arquivo)

Observação importante:
- O /dist NÃO está gerado neste pacote (não é possível rodar 'build' no ambiente de geração deste arquivo).
  Para gerar o build final (pasta /dist) e publicar na Vercel, siga as instruções abaixo.

Passo-a-passo: preparar localmente e publicar na Vercel
------------------------------------------------------
1) Instalar Node.js (versão LTS recomendada) e npm.
2) No terminal, dentro da pasta do projeto, rode:
   npm install
   npm run build
   npm run preview   # opcional, para testar localmente

3) O comando 'npm run build' gerará a pasta /dist que é o build estático pronto.

Publicar diretamente na Vercel (recomendado):
--------------------------------------------
Opção A - com GitHub (fácil)
- Crie um repositório no GitHub e faça push do projeto.
- No vercel.com, clique em 'New Project' → importe o repositório → Deploy.
- Em Settings > Domains, adicione 'iafeagro.com.br' e siga as instruções para apontar DNS no Registro.br.

Opção B - Upload manual (sem Git)
- Faça login na Vercel, clique em 'New Project' → 'Import Project' → 'Deploy from Local' e selecione a pasta do projeto.
- Siga os passos para configurar o build (comando: npm run build).

Como apontar o domínio no Registro.br (passos gerais)
----------------------------------------------------
1) Crie conta em https://registro.br e acesse o painel do domínio iafeagro.com.br.
2) Vá em 'DNS' ou 'Editar zona DNS' e adicione os registros fornecidos pela Vercel.
   - A Vercel normalmente pede adicionar um registro CNAME para 'www' apontando para cname.vercel-dns.com
   - E registros A/ALIAS conforme instruções do painel da Vercel.
   - A Vercel também mostrará registros TXT para validação. Copie-os exatamente.
3) Salve e aguarde a propagação (geralmente em até 1 hora, mas pode demorar até 24h em casos raros).
4) No painel da Vercel, confirme o domínio e habilite 'Enforce HTTPS'. O SSL será provisionado automaticamente.

Observações técnicas e recomendações
-----------------------------------
- Se houver dificuldades com CORS nos feeds RSS, recomendo criar um pequeno endpoint (serverless function) que faça cache dos feeds e sirva ao frontend.
- Para atualizações futuras, conectar o projeto ao GitHub facilita deploys automáticos ao dar 'git push'.
- Se quiser, eu faço o deploy para você na Vercel: para isso você precisa me autorizar a conectar ao seu GitHub ou me fornecer acesso temporário à sua conta Vercel — caso não queira, eu te guio passo-a-passo com imagens.

Arquivos gerados neste ZIP:
- iafeagro_site.zip (contendo todo o projeto)

-- Fim do guia --
