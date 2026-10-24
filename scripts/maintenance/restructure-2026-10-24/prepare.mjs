// Prepare reversible file moves and a small external checkpoint. No runtime edits.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=process.cwd(),dir='reports/restructure-2026-10-24';
const checkpoint='D:/Personal/Branding/yasser-portfolio-organization-archive-2026-10-24/restructure-2026-10-24';
if(fs.existsSync(checkpoint))throw Error('Checkpoint already exists; refusing overwrite');
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{const f=d+'/'+e.name;if(e.isSymbolicLink())throw Error('Unexpected link '+f);return e.isDirectory()?walk(f):[f]});
const mappings=[];
function move(from,to){if(!fs.existsSync(from)||fs.existsSync(to))throw Error('Unsafe move '+from);mappings.push({from,to});}
for(const file of fs.readdirSync('src/components').filter(f=>f.endsWith('.tsx'))){
  const name=file.slice(0,-4);let group;
  if(['Navbar','Footer','ThemeToggle'].includes(name))group='layout';
  else if(['HeadingReveal','Reveal','PixelReveal'].includes(name))group='animation';
  else if(['Analytics','JsonLd'].includes(name))group='seo';
  else if(name==='DropdownField')group='ui';
  else if(name==='OptimizedImage')group='media';
  else if(name==='ContactForm')group='contact';
  else if(name==='AboutPreview')group='home';
  else if(name.startsWith('About'))group='about';
  else if(name.startsWith('Resume'))group='resume';
  else if(name.startsWith('Capabilities')&&name!=='Capabilities')group='capabilities';
  else if(name.startsWith('Work'))group='work';
  else group='home';
  move('src/components/'+file,'src/components/'+group+'/'+file);
}
for(const file of ['CaseStudyImage','VideoPlayer','ZoomableCaseStudyImage'])move(`src/components/case-study/${file}.tsx`,`src/components/media/${file}.tsx`);
for(const file of ['SocialMediaGrid','SocialMediaShowcase','SnapchatStoryViewer','PresentationDeckViewer','PrintDocumentSlides'])move(`src/components/case-study/${file}.tsx`,`src/components/galleries/${file}.tsx`);
for(const file of ['useDialogFocus','useSafeReducedMotion'])move(`src/lib/${file}.ts`,`src/hooks/${file}.ts`);
for(const file of fs.readdirSync('scripts').filter(f=>f.endsWith('.mjs'))){
  const group=file.startsWith('audit-')?'audit':file.startsWith('project-')?'media':'performance';
  move('scripts/'+file,'scripts/'+group+'/'+file);
}
for(const [from,to]of [
 ['docs/website-brief.md','docs/website-brief.md'],
 ['docs/brand/personal-brand-context.md','docs/brand/personal-brand-context.md'],
 ['docs/case-studies/dolato/asset-mapping.json','docs/case-studies/dolato/asset-mapping.json'],
 ['docs/case-studies/dolato/implementation.md','docs/case-studies/dolato/implementation.md'],
 ['docs/case-studies/renovofix/approved-web-copy.md','docs/case-studies/renovofix/approved-web-copy.md'],
 ['docs/case-studies/social-media-campaign/asset-mapping.json','docs/case-studies/social-media-campaign/asset-mapping.json'],
 ['docs/case-studies/x-factor/approved-web-copy.md','docs/case-studies/x-factor/approved-web-copy.md'],
 ['docs/case-studies/x-factor/master-context.md','docs/case-studies/x-factor/master-context.md'],
 ['docs/case-studies/pillars-pr/approved-web-copy.md','docs/case-studies/pillars-pr/approved-web-copy.md'],
 ['docs/case-studies/pillars-pr/master-context.md','docs/case-studies/pillars-pr/master-context.md'],
 ['docs/case-studies/social-media-campaign/design-notes.md','docs/case-studies/social-media-campaign/design-notes.md'],
 ['docs/seo/indexing-cleanup.md','docs/seo/indexing-cleanup.md'],
 ['docs/assets/presentations-cover.md','docs/assets/presentations-cover.md'],
])move(from,to);
const originalFiles=[...walk('src'),...walk('docs'),...walk('content'),...walk('scripts'),'docs/website-brief.md','docs/brand/personal-brand-context.md','README.md','CLAUDE.md','AGENTS.md','.gitignore','.vercelignore','package.json','package-lock.json','tsconfig.json','next.config.ts','postcss.config.mjs','eslint.config.mjs'];
fs.mkdirSync(checkpoint,{recursive:true});
const originals=[];
for(const file of originalFiles){const copy=path.join(checkpoint,'files',file);fs.mkdirSync(path.dirname(copy),{recursive:true});fs.copyFileSync(file,copy,fs.constants.COPYFILE_EXCL);const sha256=hash(file);if(hash(copy)!==sha256)throw Error('Checkpoint mismatch');originals.push({file,sha256,bytes:fs.statSync(file).size,checkpoint:copy});}
const reportFiles=walk('reports').filter(f=>!f.startsWith(dir+'/')).map(file=>({file,sha256:hash(file),bytes:fs.statSync(file).size}));
const protectedFiles=[...walk('public'),'.env.local','.env.example','next-env.d.ts'].map(file=>({file,sha256:hash(file),bytes:fs.statSync(file).size}));
const plan={createdAt:new Date().toISOString(),root,checkpoint,mappings,reportMove:{from:'reports',to:'reports'},originals,reportFiles,protectedFiles,gitStatus:execFileSync('git',['status','--porcelain=v1','-z','--untracked-files=all'],{encoding:'utf8'})};
fs.writeFileSync(`${dir}/plan.json`,JSON.stringify(plan,null,2),{flag:'wx'});
fs.copyFileSync(`${dir}/plan.json`,path.join(checkpoint,'plan.json'),fs.constants.COPYFILE_EXCL);
console.log(JSON.stringify({fileMoves:mappings.length,reportFiles:reportFiles.length,checkpointFiles:originals.length,checkpointBytes:originals.reduce((n,f)=>n+f.bytes,0),checkpoint,groups:mappings.reduce((a,m)=>(a[m.to.split('/').slice(0,-1).join('/')]=(a[m.to.split('/').slice(0,-1).join('/')]??0)+1,a),{})},null,2));
