"""Build a self-contained offline game; Python 3 standard library only."""
from pathlib import Path
import base64,re
root=Path(__file__).resolve().parent
html=(root/'index.html').read_text()
css=(root/'style.css').read_text().replace('assets/cover.jpg','data:image/jpeg;base64,'+base64.b64encode((root/'assets/cover.jpg').read_bytes()).decode())
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+css+'</style>')
for name in ['events','engine','music','board','app']:
 js=(root/(name+'.js')).read_text()
 if name=='app':
  for asset in ['lunch','nap','cleaning']:
   js=js.replace('assets/'+asset+'.png','data:image/png;base64,'+base64.b64encode((root/'assets'/(asset+'.png')).read_bytes()).decode())
 if name=='events':js=js.replace('assets/positive-discipline.pdf','data:application/pdf;base64,'+base64.b64encode((root/'assets/positive-discipline.pdf').read_bytes()).decode())
 html=html.replace('<script src="'+name+'.js"></script>','<script>'+js.replace('</script','<\\/script')+'</script>')
html=html.replace('href="index.html"','href="play-standalone.html"')
(root/'play-standalone.html').write_text(html)
print('Built play-standalone.html')
