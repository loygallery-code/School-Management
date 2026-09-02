/* ============================================================
   auth.js — ລະບົບ login ແລະ ສິດທິ (RBAC) ໃຊ້ຮ່ວມກັນທຸກໜ້າ
   ຕ້ອງໂຫລດ supabase-js ກ່ອນ ແລະ ຕ້ອງມີຕົວແປ sb (Supabase client)
   ໃນໜ້ານັ້ນແລ້ວ ກ່ອນຈະ include ໄຟລ໌ນີ້
   ============================================================ */

const ROLE_LABELS = {
  admin_system: 'ແອັດມີນ',
  director: 'ຜູ້ບໍລິຫານ',
  administration: 'ຝ່າຍບໍລິຫານ',
  academic_affairs: 'ຝ່າຍວິຊາການ',
  teacher: 'ຄູ'
};

// ອະນຸຍາດເຕັມ / ເບິ່ງຢ່າງດຽວ / ບໍ່ໃຫ້ເຂົ້າ — ຕໍ່ໜ້າ ຕໍ່ role
// 'special' = academic.html ຄິດເອງລະອຽດພາຍໃນໜ້າ (ອີງໃສ່ homeroom/subject assignment)
const PAGE_ACCESS = {
  'index.html':    { admin_system:'edit', director:'edit', administration:'edit', academic_affairs:'view', teacher:'none' },
  'staff.html':    { admin_system:'edit', director:'edit', administration:'edit', academic_affairs:'view', teacher:'none' },
  'finance.html':  { admin_system:'edit', director:'edit', administration:'edit', academic_affairs:'none', teacher:'none' },
  'reports.html':  { admin_system:'edit', director:'edit', administration:'view', academic_affairs:'view', teacher:'none' },
  'academic.html': { admin_system:'edit', director:'edit', administration:'none', academic_affairs:'special', teacher:'special' }
};

function getCurrentPage(){
  let path = window.location.pathname.split('/').pop();
  if(!path) return 'index.html';
  if(!path.endsWith('.html')) path += '.html';
  return path;
}

function getSession(){
  const raw = sessionStorage.getItem('schoolUser');
  if(!raw) return null;
  try { return JSON.parse(raw); } catch(e){ return null; }
}

function saveSession(session){
  sessionStorage.setItem('schoolUser', JSON.stringify(session));
}

function logout(){
  sessionStorage.removeItem('schoolUser');
  window.location.href = 'login.html';
}
window.logout = logout;

// ຮຽກຄັ້ງດຽວຢູ່ຫົວໜ້າ script ຂອງທຸກໜ້າທີ່ຕ້ອງການ login (ບໍ່ແມ່ນ login.html ເອງ)
async function guardPage(){
  const session = getSession();
  if(!session){
    window.location.href = 'login.html';
    return null;
  }

  const page = getCurrentPage();
  let access = (PAGE_ACCESS[page] || {})[session.role] || 'none';

  // ຄວາມປອດໄພເພີ່ມເຕີມ: ແອັດມີນ ແລະ ຜູ້ບໍລິຫານ ຕ້ອງບໍ່ຖືກລັອກອອກຈາກໜ້າໃດເລີຍ
  if(session.role === 'admin_system' || session.role === 'director'){
    access = 'edit';
  }

  if(access === 'none'){
    alert('ທ່ານບໍ່ມີສິດເຂົ້າໜ້ານີ້');
    window.location.href = (session.role === 'teacher' || session.role === 'academic_affairs') ? 'academic.html' : 'index.html';
    return null;
  }

  if(access === 'view'){
    document.body.classList.add('view-only-mode');
  }

  injectUserBadge(session);
  return session;
}
window.guardPage = guardPage;

function injectUserBadge(session){
  const foot = document.querySelector('.sidebar-foot');
  if(!foot) return;
  const roleLabel = ROLE_LABELS[session.role] || session.role;
  foot.innerHTML = `
    <div style="margin-bottom:8px;">👤 ${session.display_name ? session.display_name : session.username}<br>
    <span style="opacity:.75;">${roleLabel}</span></div>
    <button onclick="logout()" style="background:transparent; border:1px solid #7B87A6; color:#C9CEDC; padding:5px 10px; border-radius:6px; font-size:11px; cursor:pointer; width:100%;">ອອກຈາກລະບົບ</button>
  `;
}

// ---------- View-only mode: ປິດການໃຊ້ງານ ປຸ່ມ/ຟອມ ທີ່ແກ້ໄຂຂໍ້ມູນ ----------
// ອະນຸຍາດ: ຊ່ອງຄົ້ນຫາ/ກອງ (id/class ຂຶ້ນຕົ້ນດ້ວຍ search/filter/inv) ແລະ ປຸ່ມພິມ (id ຂຶ້ນຕົ້ນດ້ວຍ btnPrint)
document.addEventListener('DOMContentLoaded', ()=>{
  const observer = new MutationObserver(()=>{
    if(!document.body.classList.contains('view-only-mode')) return;
    applyViewOnlyLock();
  });
  observer.observe(document.body, {childList:true, subtree:true});
});

function isExempt(el){
  const id = el.id || '';
  if(id.startsWith('btnPrint')) return true;
  if(id.toLowerCase().includes('search')) return true;
  if(id.toLowerCase().includes('filter')) return true;
  if(el.tagName === 'INPUT' && el.type === 'text' && id.toLowerCase().includes('search')) return true;
  return false;
}

function applyViewOnlyLock(){
  document.querySelectorAll('main button, main input, main select, main textarea').forEach(el=>{
    if(isExempt(el)) return;
    if(el.dataset.viewLocked) return;
    el.dataset.viewLocked = '1';
    el.disabled = true;
    el.style.opacity = '0.5';
    el.style.cursor = 'not-allowed';
  });
}
