"""Gera variantes recortadas (proporção da moldura) com enquadramento pelo rosto.
Uso: python3 crop-fotos.py  -> escreve dist/assets/fotos/*--slot.webp e fotos.json"""
from PIL import Image
import json, os
SRC='dist/assets/fotos'
# (centro do rosto y, topo da cabeça y) em fração da altura; 0.5/0.0 = sem rosto
FOCAL={'bruna-consultorio':(0.18,0.06),'bruna-logo-02':(0.33,0.17),'bruna-leitura-02':(0.35,0.22),'bruna-logo-01':(0.32,0.12),
'bruna-leitura-01':(0.22,0.10),'bruna-cafe-01':(0.22,0.09),'bruna-cafe-03':(0.34,0.23),'bruna-cafe-02':(0.28,0.14),
'varejo-01':(0.42,0.30),'varejo-02':(0.36,0.26),'varejo-03':(0.38,0.28),'varejo-04':(0.45,0.35),'varejo-anotacoes':(0.50,0.40),
'livro-duetto':(0.47,0.33),'certificado-engenharia-equipes':(0.5,0.0),'certificados-01':(0.45,0.0),'certificados-02':(0.5,0.0),
'certificados-03':(0.5,0.0),'certificados-parede':(0.45,0.0),'espaco-sofa':(0.55,0.0),'espaco-orquidea':(0.45,0.0),
'espaco-cafe-01':(0.5,0.0),'espaco-quadro-01':(0.35,0.0),'logo-parede':(0.42,0.0),'espaco-poltrona':(0.55,0.0),
'espaco-quadro-02':(0.45,0.0),'espaco-bar-01':(0.55,0.0),'espaco-mesa':(0.5,0.0),'espaco-espelho':(0.45,0.0),
'espaco-cafe-02':(0.6,0.0),'logo-detalhe':(0.5,0.0),'espaco-cafe-03':(0.5,0.0),'espaco-bar-02':(0.55,0.0)}
# proporção (largura/altura) de cada moldura e posição desejada do rosto na janela
SLOTS={'hero':(0.8,0.36),'concept':(0.75,0.36),'method':(1.775,0.45),'audience':(1.45,0.5),'service':(1.5,0.5),
'authority':(0.8,0.36),'cert':(1.0,0.5),'case':(0.87,0.40),'pain':(0.91,0.40),'tile':(1.33,0.5),'wide':(2.7,0.5),'tall':(0.64,0.40),'wall':(1.78,0.5)}
USES=[('bruna-consultorio','hero'),('varejo-03','hero'),('varejo-02','hero'),('varejo-01','hero'),('bruna-logo-01','hero'),
('varejo-02','pain'),('varejo-anotacoes','pain'),('varejo-04','pain'),('bruna-leitura-02','pain'),
('bruna-leitura-01','concept'),('varejo-anotacoes','method'),('varejo-04','audience'),('bruna-logo-02','audience'),
('varejo-03','service'),('varejo-02','service'),('varejo-01','service'),('bruna-cafe-01','service'),
('bruna-logo-01','authority'),('certificados-parede','wall'),('certificado-engenharia-equipes','cert'),('certificados-03','cert'),('certificados-02','cert'),('certificados-01','cert'),
('varejo-04','case'),('varejo-03','case'),('livro-duetto','case'),
('espaco-sofa','wide'),('bruna-cafe-03','tall'),('espaco-orquidea','tile'),('espaco-cafe-01','tile'),('espaco-quadro-01','tall'),('logo-parede','tile'),
('bruna-cafe-02','tall'),('espaco-poltrona','tile'),('espaco-quadro-02','tile'),('espaco-bar-01','tile'),('espaco-mesa','tile'),('espaco-espelho','tile'),
('espaco-cafe-02','tile'),('logo-detalhe','tile'),('espaco-cafe-03','tile'),('espaco-bar-02','tile')]
out={}
for name,slot in USES:
    im=Image.open(f'{SRC}/{name}.webp'); W,H=im.size; asp,want=SLOTS[slot]; fy,top=FOCAL[name]
    if W/H < asp:   # moldura mais larga: corta em cima/embaixo
        ch=W/asp; vis=ch/H
        t=fy-want*vis
        if top>0: t=min(t,max(0,top-0.09))
        t=min(max(t,0),1-vis)
        box=(0,round(t*H),W,round(t*H+ch))
    else:            # moldura mais alta: corta nas laterais
        cw=H*asp; l=(W-cw)/2; box=(round(l),0,round(l+cw),H)
    c=im.crop(box); var=f'{name}--{slot}'
    c.save(f'{SRC}/{var}.webp',quality=82,method=6)
    # posição do rosto dentro do recorte (para object-position)
    fyc=(fy*H-box[1])/(box[3]-box[1]) if W/H<asp else fy
    out[var]={'w':c.width,'h':c.height,'fy':round(min(max(fyc,0.05),0.30)*100)}
json.dump(out,open('fotos.json','w'),indent=0)
print(len(out),'variantes geradas')
