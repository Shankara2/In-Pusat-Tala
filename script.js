// DOM Elements
const navbar = document.getElementById('navbar');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const currentDateEl = document.getElementById('currentDate');

// Login & User State Elements
const roleTabs = document.querySelectorAll('.role-tab');
const selectedRoleInput = document.getElementById('selectedRole');
const usernameGroup = document.getElementById('usernameGroup');
const usernameLabel = document.getElementById('usernameLabel');
const usernameInput = document.getElementById('usernameInput');
const passwordGroup = document.getElementById('passwordGroup');
const passwordLabel = document.getElementById('passwordLabel');
const passwordInput = document.getElementById('passwordInput');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const loginForm = document.getElementById('loginForm');
const loginAlert = document.getElementById('loginAlert');
const guestAccessBtn = document.getElementById('guestAccessBtn');
const demoHintText = document.getElementById('demoHintText');

// Navbar & Welcome User Elements
const userNavStatus = document.getElementById('userNavStatus');
const navUserName = document.getElementById('navUserName');
const navUserRole = document.getElementById('navUserRole');
const logoutBtn = document.getElementById('logoutBtn');
const welcomeBanner = document.getElementById('welcomeBanner');
const bannerUserName = document.getElementById('bannerUserName');
const bannerUserRole = document.getElementById('bannerUserRole');

// Role Configuration Data (3 Roles: Murid & GTK require password only; Admin requires user & password)
const roleConfig = {
    murid: {
        requireUsername: false,
        passwordLabel: 'Kata Sandi Murid',
        passwordPlaceholder: 'Masukkan Kata Sandi Murid',
        defaultName: 'Murid MAN IC',
        roleTitle: 'Murid',
        demoHint: '<strong>Kata Sandi Murid:</strong> <code>murid123</code>'
    },
    gtk: {
        requireUsername: false,
        passwordLabel: 'Kata Sandi GTK',
        passwordPlaceholder: 'Masukkan Kata Sandi GTK',
        defaultName: 'Dr. H. M. Ridwan, M.Pd.',
        roleTitle: 'GTK / Staf Pengajar',
        demoHint: '<strong>Kata Sandi GTK:</strong> <code>gtk123</code>'
    },
    admin: {
        requireUsername: true,
        usernameLabel: 'Username Admin',
        usernamePlaceholder: 'Masukkan Username Admin (misal: admin)',
        passwordLabel: 'Kata Sandi Admin',
        passwordPlaceholder: 'Masukkan Kata Sandi Admin',
        defaultName: 'Administrator Portal',
        roleTitle: 'Administrator Utama',
        demoHint: '<strong>Username:</strong> <code>admin</code> | <strong>Password:</strong> <code>admin123</code>'
    }
};

// Update Current Date in Indonesian Format
function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    currentDateEl.textContent = today.toLocaleDateString('id-ID', options);
}
updateDate();

// Hide Welcome Banner on Scroll Down
window.addEventListener('scroll', () => {
    const welcomeBanner = document.getElementById('welcomeBanner');
    if (welcomeBanner && welcomeBanner.style.display !== 'none') {
        if (window.scrollY > 40) {
            welcomeBanner.classList.add('scrolled-out');
        } else {
            welcomeBanner.classList.remove('scrolled-out');
        }
    }
});

// Navbar Scroll Effect
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Sidebar Toggle
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

if (menuBtn && sidebar) {
    const toggleSidebar = (show) => {
        const isActive = show !== undefined ? show : !sidebar.classList.contains('active');
        sidebar.classList.toggle('active', isActive);
        if (sidebarOverlay) sidebarOverlay.classList.toggle('active', isActive);
        const icon = menuBtn.querySelector('i');
        if (icon) {
            if (isActive) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    };

    menuBtn.addEventListener('click', () => toggleSidebar());
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', () => toggleSidebar(false));

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            toggleSidebar(false);
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Desktop Sidebar Expand / Collapse Toggle
const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
        const isCollapsed = sidebar.classList.toggle('collapsed');
        document.body.classList.toggle('sidebar-collapsed', isCollapsed);
    });
}

// Function to update Role UI controls dynamically
function updateRoleUI(role) {
    const config = roleConfig[role] || roleConfig.murid;
    selectedRoleInput.value = role;

    if (config.requireUsername) {
        usernameGroup.style.display = 'flex';
        usernameInput.setAttribute('required', 'required');
        if (usernameLabel) usernameLabel.textContent = config.usernameLabel;
        if (usernameInput) usernameInput.placeholder = config.usernamePlaceholder;
    } else {
        usernameGroup.style.display = 'none';
        usernameInput.removeAttribute('required');
        usernameInput.value = '';
    }

    if (passwordLabel) passwordLabel.textContent = config.passwordLabel;
    if (passwordInput) passwordInput.placeholder = config.passwordPlaceholder;
    if (demoHintText) demoHintText.innerHTML = config.demoHint;

    hideAlert();
}

// Role Switcher Click Handler
roleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        roleTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const role = tab.getAttribute('data-role');
        updateRoleUI(role);
    });
});

// Show/Hide Password Toggle
if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        const icon = togglePasswordBtn.querySelector('i');
        if (type === 'text') {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
}

// Alert helper functions
function showAlert(message, type = 'danger') {
    loginAlert.className = `login-alert alert-${type}`;
    loginAlert.innerHTML = `<i class="fa-solid ${type === 'danger' ? 'fa-circle-exclamation' : 'fa-circle-check'}"></i> ${message}`;
    loginAlert.style.display = 'block';
}

function hideAlert() {
    loginAlert.style.display = 'none';
    loginAlert.innerHTML = '';
}

// Handle Login Submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const role = selectedRoleInput.value;
        const config = roleConfig[role] || roleConfig.murid;
        const username = usernameInput ? usernameInput.value.trim() : '';
        const password = passwordInput ? passwordInput.value : '';

        // Validation for required fields based on role
        if (config.requireUsername && !username) {
            showAlert('Harap isi Username Admin!');
            return;
        }

        if (!password) {
            showAlert('Harap isi Kata Sandi!');
            return;
        }

        let displayName = config.defaultName;
        if (role === 'admin' && username) {
            displayName = `Admin (${username})`;
        }

        showAlert(`Berhasil masuk! Menghubungkan ke Portal ${role.toUpperCase()}...`, 'success');

        setTimeout(() => {
            setLoggedInState(displayName, config.roleTitle, role);
            
            // Scroll smoothly to dashboard information
            const targetElement = document.querySelector('#pengumuman');
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }, 600);
    });
}

// Admin Information State & Management
const DEFAULT_PORTAL_INFO = {
    pengumumanTitle: 'Pengumuman Utama',
    pengumumanText: 'Pendaftaran Seleksi Nasional Peserta Didik Baru (SNPDB) MAN Insan Cendekia Tanah Laut Tahun Ajaran 2026/2027 telah dibuka secara online. Segera lengkapi berkas persyaratan dan verifikasi akun Anda sebelum batas waktu yang ditentukan.',
    beritaTitle: 'Tim Robotik MAN ICT Raih Emas Internasional',
    beritaText: 'Perwakilan murid MAN ICT sukses memboyong medali emas pada ajang World Robotics Championship 2026.',
    agendaTitle: 'Upacara Kemerdekaan RI',
    agendaLoc: 'Lapangan Utama Kampus MAN ICT',
    email: 'info@ictanahlaut.sch.id',
    phone: '+62 512 3456 789'
};

function getPortalInfo() {
    const saved = localStorage.getItem('portalAdminInfo');
    return saved ? JSON.parse(saved) : DEFAULT_PORTAL_INFO;
}

function applyPortalInfo() {
    const info = getPortalInfo();
    const elTitle = document.getElementById('displayPengumumanTitle');
    const elText = document.getElementById('displayPengumumanText');
    const elBeritaTitle = document.getElementById('displayBeritaTitle');
    const elBeritaText = document.getElementById('displayBeritaText');
    const elAgendaTitle = document.getElementById('displayAgendaTitle');
    const elAgendaLoc = document.getElementById('displayAgendaLoc');
    const elEmail = document.getElementById('displayEmail');
    const elPhone = document.getElementById('displayPhone');

    if (elTitle) elTitle.textContent = info.pengumumanTitle;
    if (elText) elText.textContent = info.pengumumanText;
    if (elBeritaTitle) elBeritaTitle.textContent = info.beritaTitle;
    if (elBeritaText) elBeritaText.textContent = info.beritaText;
    if (elAgendaTitle) elAgendaTitle.textContent = info.agendaTitle;
    if (elAgendaLoc) elAgendaLoc.textContent = info.agendaLoc;
    if (elEmail) elEmail.textContent = info.email;
    if (elPhone) elPhone.textContent = info.phone;
}

// Apply saved info on page load
applyPortalInfo();

// =============================================
// UNIFIED ADMIN MODAL - CENTRAL CONTROL CENTER
// =============================================

const unifiedAdminModal = document.getElementById('unifiedAdminModal');
const openUnifiedAdminModalBtn = document.getElementById('openUnifiedAdminModalBtn');
const closeUnifiedAdminModalBtn = document.getElementById('closeUnifiedAdminModalBtn');
const cancelUnifiedAdminModalBtn = document.getElementById('cancelUnifiedAdminModalBtn');

// Open Unified Admin Modal and initialize default panel (info)
function openUnifiedAdminModal(targetPanel) {
    if (!unifiedAdminModal) return;

    // Reset to first panel or jump to a specific one
    switchAdminPanel(targetPanel || 'info');

    // Pre-fill the Info Portal panel fields
    const info = getPortalInfo();
    const pTitleEl = document.getElementById('editPengumumanTitle');
    const pTextEl  = document.getElementById('editPengumumanText');
    const bTitleEl = document.getElementById('editBeritaTitle');
    const bTextEl  = document.getElementById('editBeritaText');
    const aTitleEl = document.getElementById('editAgendaTitle');
    const aLocEl   = document.getElementById('editAgendaLoc');
    const emailEl  = document.getElementById('editEmail');
    const phoneEl  = document.getElementById('editPhone');
    if (pTitleEl) pTitleEl.value = info.pengumumanTitle;
    if (pTextEl)  pTextEl.value  = info.pengumumanText;
    if (bTitleEl) bTitleEl.value = info.beritaTitle;
    if (bTextEl)  bTextEl.value  = info.beritaText;
    if (aTitleEl) aTitleEl.value = info.agendaTitle;
    if (aLocEl)   aLocEl.value   = info.agendaLoc;
    if (emailEl)  emailEl.value  = info.email;
    if (phoneEl)  phoneEl.value  = info.phone;

    unifiedAdminModal.style.display = 'flex';
}

function closeUnifiedAdminModal() {
    if (unifiedAdminModal) unifiedAdminModal.style.display = 'none';
}

if (openUnifiedAdminModalBtn) openUnifiedAdminModalBtn.addEventListener('click', () => openUnifiedAdminModal('info'));
if (closeUnifiedAdminModalBtn) closeUnifiedAdminModalBtn.addEventListener('click', closeUnifiedAdminModal);
if (cancelUnifiedAdminModalBtn) cancelUnifiedAdminModalBtn.addEventListener('click', closeUnifiedAdminModal);

// Close modal when clicking outside the card
if (unifiedAdminModal) {
    unifiedAdminModal.addEventListener('click', (e) => {
        if (e.target === unifiedAdminModal) closeUnifiedAdminModal();
    });
}

// Switch main admin panels (Info / Taskbar / Cards / Gallery)
function switchAdminPanel(panelName) {
    // Update tab buttons
    document.querySelectorAll('.admin-panel-tab').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-admin-panel') === panelName);
    });
    // Show correct panel content
    document.querySelectorAll('.admin-panel-content').forEach(panel => {
        panel.classList.toggle('active', panel.id === 'admin-panel-' + panelName);
        panel.style.display = panel.id === 'admin-panel-' + panelName ? 'flex' : 'none';
    });

    // Panel-specific initialization
    if (panelName === 'taskbar') {
        renderAdminTaskbarList();
        populateAdminCardTabSelect();
    } else if (panelName === 'cards') {
        populateAdminCardTabSelect();
        const sel = document.getElementById('adminCardTargetTabSelect');
        if (sel && sel.value) renderTabContentCardsList(sel.value);
    } else if (panelName === 'gallery') {
        renderAdminGalleryList();
    }
}

// Bind main panel tab buttons
document.querySelectorAll('.admin-panel-tab').forEach(btn => {
    btn.addEventListener('click', () => {
        const panel = btn.getAttribute('data-admin-panel');
        switchAdminPanel(panel);
    });
});

// ---- Info Sub-tabs (Pengumuman / Berita / Agenda / Kontak) ----
document.querySelectorAll('.admin-edit-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const section = tab.getAttribute('data-section');
        // Update tab highlight
        document.querySelectorAll('.admin-edit-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // Show correct section
        document.querySelectorAll('.admin-edit-section').forEach(s => {
            const isActive = s.id === 'admin-section-' + section;
            s.classList.toggle('active', isActive);
            s.style.display = isActive ? 'block' : 'none';
        });
    });
});

// Info Portal form submit
const adminEditForm = document.getElementById('adminEditForm');
if (adminEditForm) {
    adminEditForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updatedInfo = {
            pengumumanTitle: (document.getElementById('editPengumumanTitle') || {}).value?.trim() || '',
            pengumumanText:  (document.getElementById('editPengumumanText')  || {}).value?.trim() || '',
            beritaTitle:     (document.getElementById('editBeritaTitle')     || {}).value?.trim() || '',
            beritaText:      (document.getElementById('editBeritaText')      || {}).value?.trim() || '',
            agendaTitle:     (document.getElementById('editAgendaTitle')     || {}).value?.trim() || '',
            agendaLoc:       (document.getElementById('editAgendaLoc')       || {}).value?.trim() || '',
            email:           (document.getElementById('editEmail')           || {}).value?.trim() || '',
            phone:           (document.getElementById('editPhone')           || {}).value?.trim() || ''
        };
        localStorage.setItem('portalAdminInfo', JSON.stringify(updatedInfo));
        applyPortalInfo();
        showAlert('Informasi portal berhasil diperbarui!', 'success');
    });
}

// Populate the Cards panel's tab selector dropdown
function populateAdminCardTabSelect() {
    const sel = document.getElementById('adminCardTargetTabSelect');
    if (!sel) return;
    const items = getTaskbarItems();
    sel.innerHTML = items.map(item => `<option value="${item.id}">${item.title}</option>`).join('');
    // On change, refresh the cards list
    sel.onchange = () => renderTabContentCardsList(sel.value);
    // Initial render
    if (sel.value) renderTabContentCardsList(sel.value);
}

// Handle Guest Access - Redirect to official web
if (guestAccessBtn) {
    guestAccessBtn.addEventListener('click', (e) => {
        showAlert('Mengalihkan ke website resmi MAN ICT (ictala.sch.id)...', 'success');
    });
}

// Switch Tab Function for Taskbar Items
function switchDashboardTab(tabId) {
    if (!tabId) return;

    // Highlight active link in sidebar
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkTab = link.getAttribute('data-tab') || (link.getAttribute('href') ? link.getAttribute('href').replace('#', '') : '');
        if (linkTab === tabId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Show active tab content and hide others
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        const contentId = content.id.replace('tab-', '');
        if (contentId === tabId) {
            content.style.display = 'block';
            content.classList.add('active');
        } else {
            content.style.display = 'none';
            content.classList.remove('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Set Logged In UI State & Save Session
function setLoggedInState(name, roleTitle, role = 'murid', saveSession = true) {
    if (userNavStatus) userNavStatus.style.display = 'flex';
    if (navUserName) navUserName.textContent = name;
    if (navUserRole) navUserRole.textContent = roleTitle.split(' ')[0];

    if (welcomeBanner) {
        welcomeBanner.style.display = 'flex';
        welcomeBanner.classList.remove('scrolled-out');
    }
    if (bannerUserName) bannerUserName.textContent = name;
    if (bannerUserRole) bannerUserRole.textContent = roleTitle;

    const adminControlBar = document.getElementById('adminControlBar');
    if (adminControlBar) {
        adminControlBar.style.display = role === 'admin' ? 'flex' : 'none';
    }

    // HIDE login page (#beranda) & SHOW sidebar taskbar, dashboard (#pengumuman) & footer (#kontak-footer)
    const loginSection = document.getElementById('beranda');
    const mainDashboard = document.getElementById('pengumuman');
    const mainFooter = document.getElementById('kontak-footer');
    const sidebar = document.getElementById('sidebar');

    if (loginSection) loginSection.style.display = 'none';
    if (sidebar) sidebar.style.display = 'flex';
    if (mainDashboard) mainDashboard.style.display = 'block';
    if (mainFooter) mainFooter.style.display = 'block';

    document.body.classList.add('logged-in');

    // Save session state to localStorage so refresh keeps user logged in
    if (saveSession) {
        localStorage.setItem('portalUserSession', JSON.stringify({ name, roleTitle, role }));
    }

    // Default to 'pengumuman' tab when logging in
    switchDashboardTab('pengumuman');
    setTimeout(() => {
        if (typeof initCardBookmarks === 'function') initCardBookmarks();
        if (typeof updateSavedCounters === 'function') updateSavedCounters();
    }, 150);
}

// Check Existing Session on Page Reload
function checkExistingSession() {
    const savedSession = localStorage.getItem('portalUserSession');
    if (savedSession) {
        try {
            const session = JSON.parse(savedSession);
            if (session && session.name && session.roleTitle) {
                setLoggedInState(session.name, session.roleTitle, session.role || 'murid', false);
            }
        } catch (e) {
            localStorage.removeItem('portalUserSession');
        }
    }
}
checkExistingSession();

// Handle Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        // Clear saved session on logout
        localStorage.removeItem('portalUserSession');

        if (userNavStatus) userNavStatus.style.display = 'none';
        if (welcomeBanner) welcomeBanner.style.display = 'none';

        const adminControlBar = document.getElementById('adminControlBar');
        if (adminControlBar) adminControlBar.style.display = 'none';

        // SHOW standalone login page (#beranda) & HIDE sidebar taskbar, dashboard (#pengumuman) & footer (#kontak-footer)
        const loginSection = document.getElementById('beranda');
        const mainDashboard = document.getElementById('pengumuman');
        const mainFooter = document.getElementById('kontak-footer');
        const sidebar = document.getElementById('sidebar');

        if (loginSection) loginSection.style.display = 'flex';
        if (sidebar) sidebar.style.display = 'none';
        if (mainDashboard) mainDashboard.style.display = 'none';
        if (mainFooter) mainFooter.style.display = 'none';

        document.body.classList.remove('logged-in');

        if (loginForm) loginForm.reset();
        hideAlert();

        // Reset to default active role UI (Murid)
        const activeTab = document.querySelector('.role-tab.active');
        const defaultRole = activeTab ? activeTab.getAttribute('data-role') : 'murid';
        updateRoleUI(defaultRole);

        showAlert('Anda telah berhasil keluar dari akun portal.', 'success');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Sidebar Taskbar navigation click handler
document.querySelectorAll('.nav-links a, .nav-tab-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const tabId = this.getAttribute('data-tab') || (this.getAttribute('href') ? this.getAttribute('href').replace('#', '') : '');
        if (tabId) {
            switchDashboardTab(tabId);
        }
    });
});

// =============================================
// ADMIN TASKBAR MANAGER
// =============================================

const DEFAULT_TASKBAR_ITEMS = [
    { id: 'pengumuman', title: 'Pengumuman', icon: 'fa-solid fa-bullhorn', fixed: true, headerTitle: 'Papan Pengumuman & Berita', contentText: 'Pengumuman resmi kampus, agenda penting, dan kabar terbaru MAN ICT.' },
    { id: 'akademik', title: 'Akademik', icon: 'fa-solid fa-graduation-cap', fixed: true, headerTitle: 'Portal Akademik & Pembelajaran', contentText: 'Akses e-learning, kalender akademik, rapor digital, dan berkas resmi kampus.' },
    { id: 'galeri', title: 'Galeri', icon: 'fa-solid fa-images', fixed: true, headerTitle: 'Galeri Prestasi & Dokumentasi', contentText: 'Dokumentasi kegiatan murid, prestasi nasional & internasional.' },
    { id: 'tersimpan', title: 'Tersimpan', icon: 'fa-solid fa-bookmark', fixed: true, headerTitle: 'Berkas & Informasi Tersimpan', contentText: 'Kumpulan pengumuman, materi, berkas, dan catatan penting yang Anda simpan agar tidak hilang.' },
    { id: 'kontak', title: 'Kontak', icon: 'fa-solid fa-address-book', fixed: true, headerTitle: 'Kontak & Informasi Kampus', contentText: 'Informasi lokasi, email, telepon, dan media sosial resmi MAN ICT.' }
];

function getTaskbarItems() {
    const saved = localStorage.getItem('portalTaskbarItems');
    let items = saved ? JSON.parse(saved) : DEFAULT_TASKBAR_ITEMS;
    // Auto-migrate if 'tersimpan' is missing
    if (!items.some(i => i.id === 'tersimpan')) {
        const kontakIdx = items.findIndex(i => i.id === 'kontak');
        const tersimpanObj = { id: 'tersimpan', title: 'Tersimpan', icon: 'fa-solid fa-bookmark', fixed: true, headerTitle: 'Berkas & Informasi Tersimpan', contentText: 'Kumpulan pengumuman, materi, berkas, dan catatan penting yang Anda simpan agar tidak hilang.' };
        if (kontakIdx !== -1) {
            items.splice(kontakIdx, 0, tersimpanObj);
        } else {
            items.push(tersimpanObj);
        }
        localStorage.setItem('portalTaskbarItems', JSON.stringify(items));
    }
    return items;
}

function saveTaskbarItems(items) {
    localStorage.setItem('portalTaskbarItems', JSON.stringify(items));
}

function generateTabId(title) {
    return 'custom-' + title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now();
}

function renderSidebarNav() {
    const items = getTaskbarItems();
    const navLinks = document.getElementById('navLinks');
    if (!navLinks) return;
    navLinks.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="#${item.id}" data-tab="${item.id}" title="${item.title}" class="${index === 0 ? 'active' : ''}">
                <i class="${item.icon} nav-icon"></i>
                <span>${item.title}</span>
            </a>`;
        navLinks.appendChild(li);
    });
    // Re-bind nav click handlers
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            if (tabId) switchDashboardTab(tabId);
        });
    });
}

function getTabCards(tabId) {
    const saved = localStorage.getItem('portalTabCards_' + tabId);
    return saved ? JSON.parse(saved) : [];
}

function saveTabCards(tabId, cards) {
    localStorage.setItem('portalTabCards_' + tabId, JSON.stringify(cards));
}

function renderDashboardTabs() {
    const items = getTaskbarItems();
    const dashboardSection = document.getElementById('pengumuman');
    if (!dashboardSection) return;
    // Remove any existing custom tabs
    dashboardSection.querySelectorAll('.tab-content.custom-tab').forEach(el => el.remove());

    items.forEach(item => {
        if (item.fixed) {
            // For fixed tabs, inject extra admin cards if any
            renderAdminCardsIntoTab(item.id);
            return;
        }
        if (document.getElementById('tab-' + item.id)) return; // Already exists
        const div = document.createElement('div');
        div.className = 'tab-content custom-tab';
        div.id = 'tab-' + item.id;
        div.style.display = 'none';
        div.innerHTML = `
            <div class="section-header">
                <div class="section-title">
                    <h2><i class="${item.icon} text-primary"></i> ${item.headerTitle}</h2>
                    <p>${item.contentText}</p>
                </div>
            </div>
            <div class="grid-dashboard" id="cards-grid-${item.id}">
                <div class="card glass-panel card-main">
                    <div class="card-icon"><i class="${item.icon}"></i></div>
                    <h3>${item.headerTitle}</h3>
                    <p>${item.contentText}</p>
                </div>
            </div>`;
        dashboardSection.appendChild(div);
        renderAdminCardsIntoTab(item.id);
    });
}

function renderAdminCardsIntoTab(tabId) {
    const cards = getTabCards(tabId);
    // Remove old admin-added cards in this tab
    const grid = document.getElementById('cards-grid-' + tabId)
        || document.querySelector('#tab-' + tabId + ' .grid-dashboard');
    if (!grid) return;
    grid.querySelectorAll('.admin-added-card').forEach(el => el.remove());
    cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'card glass-panel card-side admin-added-card';
        div.setAttribute('data-card-id', card.id);
        
        let imageHtml = '';
        if (card.image) {
            imageHtml = `
            <div class="card-img-wrapper" onclick="openLightbox('${card.image.replace(/'/g, "\\'")}', '${card.title.replace(/'/g, "\\'")}', '${card.body.replace(/'/g, "\\'")}')">
                <img src="${card.image}" alt="${card.title}" loading="lazy">
                <div class="card-img-overlay">
                    <span><i class="fa-solid fa-magnifying-glass-plus"></i> Lihat Foto</span>
                </div>
            </div>`;
        }

        div.innerHTML = `
            ${imageHtml}
            ${!card.image ? `<div class="card-icon"><i class="${card.icon}"></i></div>` : ''}
            <h3>${card.title}</h3>
            <p>${card.body}</p>`;
        grid.appendChild(div);
    });
    if (typeof initCardBookmarks === 'function') initCardBookmarks();
}

function renderAdminTaskbarList() {
    const items = getTaskbarItems();
    const list = document.getElementById('adminTaskbarList');
    if (!list) return;
    list.innerHTML = '';
    if (items.length === 0) {
        list.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">Belum ada menu taskbar.</p>';
        return;
    }
    items.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'taskbar-manage-item';
        div.innerHTML = `
            <div class="taskbar-manage-info">
                <i class="${item.icon} text-primary"></i>
                <span>${item.title}</span>
                ${item.fixed ? '<span style="font-size:0.75rem; color:var(--text-secondary); font-weight:400;">(bawaan)</span>' : ''}
            </div>
            <div class="taskbar-manage-actions">
                <button type="button" class="btn btn-outline btn-sm btn-manage-content" data-id="${item.id}" data-title="${item.title}" style="padding: 5px 12px; font-size:0.82rem;">
                    <i class="fa-solid fa-layer-group"></i> Isi
                </button>
                ${!item.fixed ? `
                <button type="button" class="btn btn-outline btn-sm btn-edit-taskbar" data-id="${item.id}" style="padding: 5px 12px; font-size:0.82rem;">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" class="btn btn-sm btn-delete-taskbar" data-id="${item.id}" style="padding: 5px 12px; font-size:0.82rem; background: rgba(220,53,69,0.1); color: var(--danger-color); border: 1px solid rgba(220,53,69,0.25); border-radius: 10px;">
                    <i class="fa-solid fa-trash"></i>
                </button>` : ''}
            </div>`;
        list.appendChild(div);
    });

    // Bind manage content buttons
    list.querySelectorAll('.btn-manage-content').forEach(btn => {
        btn.addEventListener('click', () => {
            openTabContentModal(btn.getAttribute('data-id'), btn.getAttribute('data-title'));
        });
    });

    // Bind edit/delete buttons
    list.querySelectorAll('.btn-delete-taskbar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            let items = getTaskbarItems();
            items = items.filter(i => i.id !== id);
            saveTaskbarItems(items);
            // Remove dynamic tab
            const tabEl = document.getElementById('tab-' + id);
            if (tabEl) tabEl.remove();
            renderSidebarNav();
            renderAdminTaskbarList();
            showAlert('Menu taskbar berhasil dihapus.', 'success');
        });
    });

    list.querySelectorAll('.btn-edit-taskbar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const items = getTaskbarItems();
            const item = items.find(i => i.id === id);
            if (!item) return;
            document.getElementById('taskbarItemId').value = item.id;
            document.getElementById('taskbarItemTitle').value = item.title;
            document.getElementById('taskbarItemIconSelect').value = item.icon;
            document.getElementById('taskbarHeaderTitle').value = item.headerTitle;
            document.getElementById('taskbarContentText').value = item.contentText;
            document.getElementById('taskbarFormTitle').innerHTML = '<i class="fa-solid fa-pen text-primary"></i> Edit Menu Taskbar';
            document.getElementById('saveTaskbarItemBtn').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Simpan Perubahan';
            document.getElementById('resetTaskbarFormBtn').style.display = 'inline-flex';
        });
    });
}

// Taskbar form elements (inside unified modal)
const adminTaskbarItemForm = document.getElementById('adminTaskbarItemForm');
const resetTaskbarFormBtn = document.getElementById('resetTaskbarFormBtn');

function resetTaskbarForm() {
    if (adminTaskbarItemForm) adminTaskbarItemForm.reset();
    const idEl = document.getElementById('taskbarItemId');
    if (idEl) idEl.value = '';
    const formTitle = document.getElementById('taskbarFormTitle');
    if (formTitle) formTitle.innerHTML = '<i class="fa-solid fa-plus-circle text-primary"></i> Tambah Menu Baru ke Taskbar';
    const saveBtn = document.getElementById('saveTaskbarItemBtn');
    if (saveBtn) saveBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Simpan ke Taskbar';
    if (resetTaskbarFormBtn) resetTaskbarFormBtn.style.display = 'none';
}

if (resetTaskbarFormBtn) {
    resetTaskbarFormBtn.addEventListener('click', resetTaskbarForm);
}


if (adminTaskbarItemForm) {
    adminTaskbarItemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const editId = document.getElementById('taskbarItemId').value.trim();
        const title = document.getElementById('taskbarItemTitle').value.trim();
        const icon = document.getElementById('taskbarItemIconSelect').value;
        const headerTitle = document.getElementById('taskbarHeaderTitle').value.trim();
        const contentText = document.getElementById('taskbarContentText').value.trim();

        let items = getTaskbarItems();
        if (editId) {
            // Edit existing
            items = items.map(item => item.id === editId ? { ...item, title, icon, headerTitle, contentText } : item);
            saveTaskbarItems(items);
            // Update existing tab if present
            const existingTab = document.getElementById('tab-' + editId);
            if (existingTab) existingTab.remove();
        } else {
            // Add new
            const newId = generateTabId(title);
            items.push({ id: newId, title, icon, fixed: false, headerTitle, contentText });
            saveTaskbarItems(items);
        }

        renderSidebarNav();
        renderDashboardTabs();
        renderAdminTaskbarList();
        populateAdminCardTabSelect();
        resetTaskbarForm();
        showAlert(`Menu "${title}" berhasil ${editId ? 'diperbarui' : 'ditambahkan'} ke taskbar!`, 'success');
    });
}

// Initialize on page load
renderSidebarNav();
renderDashboardTabs();

// =============================================
// TAB CONTENT CARD MANAGER (Admin: Kelola Isi Per Tab)
// =============================================

// Card content panel elements (inside unified modal)
const tabContentCardForm = document.getElementById('tabContentCardForm');
const resetTabCardFormBtn = document.getElementById('resetTabCardFormBtn');

function renderTabContentCardsList(tabId) {
    const cards = getTabCards(tabId);
    const list = document.getElementById('tabContentCardsList');
    if (!list) return;
    list.innerHTML = '';
    if (cards.length === 0) {
        list.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">Belum ada kartu informasi. Tambahkan di bawah.</p>';
        return;
    }
    cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'taskbar-manage-item';
        div.innerHTML = `
            <div class="taskbar-manage-info">
                <i class="${card.icon} text-primary"></i>
                <span style="font-size:0.9rem;">${card.title}</span>
            </div>
            <div class="taskbar-manage-actions">
                <button type="button" class="btn btn-outline btn-sm btn-edit-card" data-id="${card.id}" style="padding: 5px 12px; font-size:0.82rem;">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" class="btn btn-sm btn-delete-card" data-id="${card.id}" style="padding: 5px 12px; font-size:0.82rem; background: rgba(220,53,69,0.1); color: var(--danger-color); border: 1px solid rgba(220,53,69,0.25); border-radius: 10px;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>`;
        list.appendChild(div);
    });

    // Bind edit buttons
    list.querySelectorAll('.btn-edit-card').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const cards = getTabCards(tabId);
            const card = cards.find(c => c.id === id);
            if (!card) return;
            document.getElementById('tabCardEditId').value = card.id;
            document.getElementById('tabCardTitle').value = card.title;
            document.getElementById('tabCardBody').value = card.body;
            document.getElementById('tabCardIcon').value = card.icon;

            // Handle image in edit mode
            const imgDataInput = document.getElementById('tabCardImageData');
            const previewContainer = document.getElementById('tabCardImagePreview');
            const previewImg = previewContainer ? previewContainer.querySelector('img') : null;
            if (card.image) {
                if (imgDataInput) imgDataInput.value = card.image;
                if (previewImg) previewImg.src = card.image;
                if (previewContainer) previewContainer.style.display = 'flex';
                const urlInput = document.getElementById('tabCardImageUrl');
                if (urlInput && card.image.startsWith('http')) urlInput.value = card.image;
            } else {
                if (imgDataInput) imgDataInput.value = '';
                if (previewContainer) previewContainer.style.display = 'none';
            }

            document.getElementById('tabCardFormTitle').innerHTML = '<i class="fa-solid fa-pen text-primary"></i> Edit Kartu Informasi';
            document.getElementById('saveTabCardBtn').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Simpan Perubahan';
            resetTabCardFormBtn.style.display = 'inline-flex';
        });
    });

    // Bind delete buttons
    list.querySelectorAll('.btn-delete-card').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            let cards = getTabCards(tabId);
            cards = cards.filter(c => c.id !== id);
            saveTabCards(tabId, cards);
            renderTabContentCardsList(tabId);
            renderAdminCardsIntoTab(tabId);
            showAlert('Kartu informasi berhasil dihapus.', 'success');
        });
    });
}

// Image input handling for Tab Card Modal
const tabCardImageFile = document.getElementById('tabCardImageFile');
const tabCardImageUrl = document.getElementById('tabCardImageUrl');
const tabCardImageData = document.getElementById('tabCardImageData');
const tabCardImagePreview = document.getElementById('tabCardImagePreview');
const btnRemoveTabCardImage = document.getElementById('btnRemoveTabCardImage');

if (tabCardImageFile) {
    tabCardImageFile.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                if (tabCardImageData) tabCardImageData.value = evt.target.result;
                if (tabCardImagePreview) {
                    tabCardImagePreview.querySelector('img').src = evt.target.result;
                    tabCardImagePreview.style.display = 'flex';
                }
                if (tabCardImageUrl) tabCardImageUrl.value = '';
            };
            reader.readAsDataURL(file);
        }
    });
}

if (tabCardImageUrl) {
    tabCardImageUrl.addEventListener('input', function(e) {
        const url = e.target.value.trim();
        if (url) {
            if (tabCardImageData) tabCardImageData.value = url;
            if (tabCardImagePreview) {
                tabCardImagePreview.querySelector('img').src = url;
                tabCardImagePreview.style.display = 'flex';
            }
            if (tabCardImageFile) tabCardImageFile.value = '';
        } else {
            if (!tabCardImageFile.files.length) {
                if (tabCardImageData) tabCardImageData.value = '';
                if (tabCardImagePreview) tabCardImagePreview.style.display = 'none';
            }
        }
    });
}

if (btnRemoveTabCardImage) {
    btnRemoveTabCardImage.addEventListener('click', () => {
        if (tabCardImageFile) tabCardImageFile.value = '';
        if (tabCardImageUrl) tabCardImageUrl.value = '';
        if (tabCardImageData) tabCardImageData.value = '';
        if (tabCardImagePreview) {
            tabCardImagePreview.querySelector('img').src = '';
            tabCardImagePreview.style.display = 'none';
        }
    });
}

// Open the Cards panel inside the unified admin modal for a specific tab
function openTabContentModal(tabId, tabTitle) {
    // Switch the unified admin modal to the 'cards' panel
    openUnifiedAdminModal('cards');

    // Select the correct tab in the dropdown
    const sel = document.getElementById('adminCardTargetTabSelect');
    if (sel) {
        sel.value = tabId;
        renderTabContentCardsList(tabId);
    }

    // Reset the add card form
    if (tabContentCardForm) tabContentCardForm.reset();
    const editIdEl = document.getElementById('tabCardEditId');
    if (editIdEl) editIdEl.value = '';
    if (tabCardImageData) tabCardImageData.value = '';
    if (tabCardImagePreview) tabCardImagePreview.style.display = 'none';
    const formTitle = document.getElementById('tabCardFormTitle');
    if (formTitle) formTitle.innerHTML = '<i class="fa-solid fa-plus-circle text-primary"></i> Tambah Kartu Informasi Baru';
    const saveBtn = document.getElementById('saveTabCardBtn');
    if (saveBtn) saveBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Tambahkan Kartu';
    if (resetTabCardFormBtn) resetTabCardFormBtn.style.display = 'none';
}

if (resetTabCardFormBtn) {
    resetTabCardFormBtn.addEventListener('click', () => {
        if (tabContentCardForm) tabContentCardForm.reset();
        const editIdEl = document.getElementById('tabCardEditId');
        if (editIdEl) editIdEl.value = '';
        if (tabCardImageData) tabCardImageData.value = '';
        if (tabCardImagePreview) tabCardImagePreview.style.display = 'none';
        const formTitle = document.getElementById('tabCardFormTitle');
        if (formTitle) formTitle.innerHTML = '<i class="fa-solid fa-plus-circle text-primary"></i> Tambah Kartu Informasi Baru';
        const saveBtn = document.getElementById('saveTabCardBtn');
        if (saveBtn) saveBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Tambahkan Kartu';
        resetTabCardFormBtn.style.display = 'none';
    });
}

if (tabContentCardForm) {
    tabContentCardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Get the currently selected tab from the dropdown in the Cards panel
        const sel = document.getElementById('adminCardTargetTabSelect');
        const tabId = sel ? sel.value : '';
        if (!tabId) { showAlert('Pilih tab sasaran terlebih dahulu!', 'danger'); return; }

        const editId = (document.getElementById('tabCardEditId') || {}).value?.trim() || '';
        const title  = (document.getElementById('tabCardTitle')  || {}).value?.trim() || '';
        const body   = (document.getElementById('tabCardBody')   || {}).value?.trim() || '';
        const icon   = (document.getElementById('tabCardIcon')   || {}).value || 'fa-solid fa-circle-info';
        const image  = tabCardImageData ? tabCardImageData.value : '';

        if (!title || !body) { showAlert('Judul dan isi kartu wajib diisi!', 'danger'); return; }

        let cards = getTabCards(tabId);
        if (editId) {
            cards = cards.map(c => c.id === editId ? { ...c, title, body, icon, image } : c);
        } else {
            cards.push({ id: 'card-' + Date.now(), title, body, icon, image });
        }
        saveTabCards(tabId, cards);
        renderTabContentCardsList(tabId);
        renderAdminCardsIntoTab(tabId);

        // Reset form
        tabContentCardForm.reset();
        const editIdEl = document.getElementById('tabCardEditId');
        if (editIdEl) editIdEl.value = '';
        if (tabCardImageData) tabCardImageData.value = '';
        if (tabCardImagePreview) tabCardImagePreview.style.display = 'none';
        const formTitle = document.getElementById('tabCardFormTitle');
        if (formTitle) formTitle.innerHTML = '<i class="fa-solid fa-plus-circle text-primary"></i> Tambah Kartu Informasi Baru';
        const saveBtn = document.getElementById('saveTabCardBtn');
        if (saveBtn) saveBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Tambahkan Kartu';
        if (resetTabCardFormBtn) resetTabCardFormBtn.style.display = 'none';
        showAlert(`Kartu "${title}" berhasil ${editId ? 'diperbarui' : 'ditambahkan'}!`, 'success');
    });
}

// =============================================
// GALLERY & LIGHTBOX SYSTEM
// =============================================

const DEFAULT_GALLERY_ITEMS = [
    {
        id: 'gal-1',
        title: 'Prestasi Murid Olimpiade & Karya Ilmiah',
        desc: 'Juara 1 Karya Tulis Ilmiah Nasional & Medali Emas Olimpiade Sains Nasional (OSN) 2026 tingkat nasional.',
        badge: 'Prestasi',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'gal-2',
        title: 'Kegiatan Pembiasaan Keasramaan',
        desc: 'Kegiatan Pembiasaan Tahfidz Al-Qur\'an, Pramuka, dan Malam Bina Iman & Taqwa di lingkungan asrama kampus.',
        badge: 'Asrama',
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'gal-3',
        title: 'Laboratorium Sains & Komputer Terpadu',
        desc: 'Fasilitas Praktikum Fisika, Kimia, Biologi, dan Lab Riset Komputer Berbasis Artificial Intelligence.',
        badge: 'Laboratorium',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    }
];

function getGalleryItems() {
    const saved = localStorage.getItem('portalGalleryItems');
    return saved ? JSON.parse(saved) : DEFAULT_GALLERY_ITEMS;
}

function saveGalleryItems(items) {
    localStorage.setItem('portalGalleryItems', JSON.stringify(items));
}

function renderGalleryGrid() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    const items = getGalleryItems();
    grid.innerHTML = '';

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card glass-panel card-third';
        
        let imageMarkup = '';
        if (item.image) {
            imageMarkup = `
            <div class="card-img-wrapper" onclick="openLightbox('${item.image.replace(/'/g, "\\'")}', '${item.title.replace(/'/g, "\\'")}', '${item.desc.replace(/'/g, "\\'")}')">
                ${item.badge ? `<span class="card-gallery-badge">${item.badge}</span>` : ''}
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="card-img-overlay">
                    <span><i class="fa-solid fa-magnifying-glass-plus"></i> Perbesar Foto</span>
                </div>
            </div>`;
        } else {
            imageMarkup = `
            <div class="card-icon">
                <i class="fa-solid fa-images"></i>
            </div>`;
        }

        div.innerHTML = `
            ${imageMarkup}
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
        `;
        grid.appendChild(div);
    });
    if (typeof initCardBookmarks === 'function') initCardBookmarks();
}

// Lightbox Modal functions
const imageLightboxModal = document.getElementById('imageLightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const closeLightboxBtn = document.getElementById('closeLightboxBtn');

window.openLightbox = function(src, title, desc) {
    if (!imageLightboxModal || !lightboxImage) return;
    lightboxImage.src = src;
    if (lightboxTitle) lightboxTitle.textContent = title || '';
    if (lightboxDesc) lightboxDesc.textContent = desc || '';
    imageLightboxModal.style.display = 'flex';
};

function closeLightbox() {
    if (imageLightboxModal) imageLightboxModal.style.display = 'none';
}

if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
if (imageLightboxModal) {
    imageLightboxModal.addEventListener('click', function(e) {
        if (e.target === imageLightboxModal) closeLightbox();
    });
}

// Gallery form elements (inside unified modal)
const adminGalleryItemForm = document.getElementById('adminGalleryItemForm');
const resetGalleryFormBtn = document.getElementById('resetGalleryFormBtn');

const galleryItemImageFile = document.getElementById('galleryItemImageFile');
const galleryItemImageUrl = document.getElementById('galleryItemImageUrl');
const galleryItemImageData = document.getElementById('galleryItemImageData');
const galleryItemImagePreview = document.getElementById('galleryItemImagePreview');
const btnRemoveGalleryImage = document.getElementById('btnRemoveGalleryImage');

if (galleryItemImageFile) {
    galleryItemImageFile.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                if (galleryItemImageData) galleryItemImageData.value = evt.target.result;
                if (galleryItemImagePreview) {
                    galleryItemImagePreview.querySelector('img').src = evt.target.result;
                    galleryItemImagePreview.style.display = 'flex';
                }
                if (galleryItemImageUrl) galleryItemImageUrl.value = '';
            };
            reader.readAsDataURL(file);
        }
    });
}

if (galleryItemImageUrl) {
    galleryItemImageUrl.addEventListener('input', function(e) {
        const url = e.target.value.trim();
        if (url) {
            if (galleryItemImageData) galleryItemImageData.value = url;
            if (galleryItemImagePreview) {
                galleryItemImagePreview.querySelector('img').src = url;
                galleryItemImagePreview.style.display = 'flex';
            }
            if (galleryItemImageFile) galleryItemImageFile.value = '';
        } else {
            if (!galleryItemImageFile.files.length) {
                if (galleryItemImageData) galleryItemImageData.value = '';
                if (galleryItemImagePreview) galleryItemImagePreview.style.display = 'none';
            }
        }
    });
}

if (btnRemoveGalleryImage) {
    btnRemoveGalleryImage.addEventListener('click', () => {
        if (galleryItemImageFile) galleryItemImageFile.value = '';
        if (galleryItemImageUrl) galleryItemImageUrl.value = '';
        if (galleryItemImageData) galleryItemImageData.value = '';
        if (galleryItemImagePreview) {
            galleryItemImagePreview.querySelector('img').src = '';
            galleryItemImagePreview.style.display = 'none';
        }
    });
}

function renderAdminGalleryList() {
    const items = getGalleryItems();
    const list = document.getElementById('adminGalleryList');
    if (!list) return;
    list.innerHTML = '';
    if (items.length === 0) {
        list.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">Belum ada foto dalam galeri.</p>';
        return;
    }
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'taskbar-manage-item';
        div.innerHTML = `
            <div class="taskbar-manage-info">
                ${item.image ? `<img src="${item.image}" alt="" style="width: 32px; height: 32px; object-fit: cover; border-radius: 6px;">` : '<i class="fa-solid fa-image text-primary"></i>'}
                <span style="font-size:0.9rem; font-weight: 600;">${item.title}</span>
            </div>
            <div class="taskbar-manage-actions">
                <button type="button" class="btn btn-outline btn-sm btn-edit-gallery" data-id="${item.id}" style="padding: 5px 12px; font-size:0.82rem;">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" class="btn btn-sm btn-delete-gallery" data-id="${item.id}" style="padding: 5px 12px; font-size:0.82rem; background: rgba(220,53,69,0.1); color: var(--danger-color); border: 1px solid rgba(220,53,69,0.25); border-radius: 10px;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>`;
        list.appendChild(div);
    });

    list.querySelectorAll('.btn-edit-gallery').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const items = getGalleryItems();
            const item = items.find(i => i.id === id);
            if (!item) return;
            document.getElementById('galleryItemId').value = item.id;
            document.getElementById('galleryItemTitle').value = item.title;
            document.getElementById('galleryItemDesc').value = item.desc;
            document.getElementById('galleryItemBadge').value = item.badge || '';

            if (item.image) {
                if (galleryItemImageData) galleryItemImageData.value = item.image;
                if (galleryItemImagePreview) {
                    galleryItemImagePreview.querySelector('img').src = item.image;
                    galleryItemImagePreview.style.display = 'flex';
                }
                if (galleryItemImageUrl && item.image.startsWith('http')) {
                    galleryItemImageUrl.value = item.image;
                }
            } else {
                if (galleryItemImageData) galleryItemImageData.value = '';
                if (galleryItemImagePreview) galleryItemImagePreview.style.display = 'none';
            }

            document.getElementById('galleryFormTitle').innerHTML = '<i class="fa-solid fa-pen text-primary"></i> Edit Foto Galeri';
            document.getElementById('saveGalleryItemBtn').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Simpan Perubahan';
            resetGalleryFormBtn.style.display = 'inline-flex';
        });
    });

    list.querySelectorAll('.btn-delete-gallery').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            let items = getGalleryItems();
            items = items.filter(i => i.id !== id);
            saveGalleryItems(items);
            renderAdminGalleryList();
            renderGalleryGrid();
            showAlert('Foto galeri berhasil dihapus.', 'success');
        });
    });
}

function resetGalleryForm() {
    if (adminGalleryItemForm) adminGalleryItemForm.reset();
    const idEl = document.getElementById('galleryItemId');
    if (idEl) idEl.value = '';
    if (galleryItemImageData) galleryItemImageData.value = '';
    if (galleryItemImagePreview) galleryItemImagePreview.style.display = 'none';
    const formTitle = document.getElementById('galleryFormTitle');
    if (formTitle) formTitle.innerHTML = '<i class="fa-solid fa-plus-circle text-primary"></i> Tambah Foto Baru ke Galeri';
    const saveBtn = document.getElementById('saveGalleryItemBtn');
    if (saveBtn) saveBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Simpan Foto ke Galeri';
    if (resetGalleryFormBtn) resetGalleryFormBtn.style.display = 'none';
}

if (resetGalleryFormBtn) {
    resetGalleryFormBtn.addEventListener('click', resetGalleryForm);
}

if (adminGalleryItemForm) {
    adminGalleryItemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const editId = (document.getElementById('galleryItemId') || {}).value?.trim() || '';
        const title  = (document.getElementById('galleryItemTitle') || {}).value?.trim() || '';
        const desc   = (document.getElementById('galleryItemDesc')  || {}).value?.trim() || '';
        const badge  = (document.getElementById('galleryItemBadge') || {}).value?.trim() || '';
        const image  = galleryItemImageData ? galleryItemImageData.value : '';

        if (!title || !desc) { showAlert('Judul dan deskripsi wajib diisi!', 'danger'); return; }

        let items = getGalleryItems();
        if (editId) {
            items = items.map(i => i.id === editId ? { ...i, title, desc, badge, image } : i);
        } else {
            items.push({ id: 'gal-' + Date.now(), title, desc, badge, image });
        }
        saveGalleryItems(items);
        renderAdminGalleryList();
        renderGalleryGrid();
        resetGalleryForm();
        showAlert(`Foto "${title}" berhasil ${editId ? 'diperbarui' : 'ditambahkan'} ke galeri!`, 'success');
    });
}

// Initial render of gallery grid on load
renderGalleryGrid();

// =============================================
// STUDENT BOOKMARK / SAVE SYSTEM (Biar Gak Hilang)
// =============================================

function getSavedCards() {
    const saved = localStorage.getItem('portalStudentSavedCards');
    return saved ? JSON.parse(saved) : [];
}

function saveSavedCards(cards) {
    localStorage.setItem('portalStudentSavedCards', JSON.stringify(cards));
    updateSavedCounters();
    renderSavedCardsList();
    syncCardBookmarkButtons();
}

function updateSavedCounters() {
    const cards = getSavedCards();
    const count = cards.length;
    const quickBadge = document.getElementById('quickSavedCountBadge');
    if (quickBadge) quickBadge.textContent = count;
}

function toggleSaveCard(cardData) {
    let cards = getSavedCards();
    const index = cards.findIndex(c => c.id === cardData.id);
    if (index !== -1) {
        cards.splice(index, 1);
        saveSavedCards(cards);
        showAlert(`"${cardData.title}" dihapus dari daftar Tersimpan.`, 'success');
    } else {
        cards.unshift({
            ...cardData,
            savedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
        });
        saveSavedCards(cards);
        showAlert(`"${cardData.title}" berhasil disimpan ke daftar Tersimpan!`, 'success');
    }
}

function initCardBookmarks() {
    const cards = document.querySelectorAll('.dashboard .card');
    const saved = getSavedCards();

    cards.forEach((card, idx) => {
        // Jangan tambahkan bookmark button ke kartu di dalam tab Tersimpan
        if (card.closest('#tab-tersimpan')) return;

        const titleEl = card.querySelector('h3') || card.querySelector('h4');
        const title = titleEl ? titleEl.textContent.trim() : `Informasi #${idx + 1}`;
        const pEl = card.querySelector('p');
        const snippet = pEl ? pEl.textContent.trim() : '';
        const parentTab = card.closest('.tab-content');
        const tabId = parentTab ? parentTab.id.replace('tab-', '') : 'pengumuman';

        let tabName = 'Portal';
        if (tabId === 'pengumuman') tabName = 'Pengumuman';
        else if (tabId === 'akademik') tabName = 'Akademik';
        else if (tabId === 'galeri') tabName = 'Galeri';
        else if (tabId === 'kontak') tabName = 'Kontak';
        else {
            const h2 = parentTab ? parentTab.querySelector('.section-title h2') : null;
            if (h2) tabName = h2.textContent.trim().replace(/^[^a-zA-Z0-9]+/, '');
        }

        let cardId = card.getAttribute('data-card-id');
        if (!cardId) {
            cardId = 'card-' + tabId + '-' + title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30);
            card.setAttribute('data-card-id', cardId);
        }

        let btn = card.querySelector('.card-bookmark-btn');
        if (!btn) {
            btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'card-bookmark-btn';
            btn.setAttribute('title', 'Simpan informasi ini agar tidak hilang');
            card.appendChild(btn);

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const freshTitleEl = card.querySelector('h3') || card.querySelector('h4');
                const freshTitle = freshTitleEl ? freshTitleEl.textContent.trim() : title;
                const freshPEl = card.querySelector('p');
                const freshSnippet = freshPEl ? freshPEl.textContent.trim() : snippet;

                toggleSaveCard({
                    id: cardId,
                    title: freshTitle,
                    snippet: freshSnippet,
                    tabId: tabId,
                    tabName: tabName
                });
            });
        }

        const isSaved = saved.some(c => c.id === cardId);
        if (isSaved) {
            btn.classList.add('saved');
            btn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
            btn.setAttribute('title', 'Tersimpan (Klik untuk menghapus)');
        } else {
            btn.classList.remove('saved');
            btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
            btn.setAttribute('title', 'Simpan informasi ini agar tidak hilang');
        }
    });
}

function syncCardBookmarkButtons() {
    const saved = getSavedCards();
    document.querySelectorAll('.card-bookmark-btn').forEach(btn => {
        const card = btn.closest('.card');
        if (!card) return;
        const cardId = card.getAttribute('data-card-id');
        const isSaved = saved.some(c => c.id === cardId);
        if (isSaved) {
            btn.classList.add('saved');
            btn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
            btn.setAttribute('title', 'Tersimpan (Klik untuk menghapus)');
        } else {
            btn.classList.remove('saved');
            btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
            btn.setAttribute('title', 'Simpan informasi ini agar tidak hilang');
        }
    });
}

function renderSavedCardsList() {
    const container = document.getElementById('savedCardsListContainer');
    if (!container) return;
    const cards = getSavedCards();

    if (cards.length === 0) {
        container.innerHTML = `
            <div class="empty-saved-state">
                <div class="empty-icon"><i class="fa-regular fa-bookmark"></i></div>
                <h4>Belum Ada Informasi Tersimpan</h4>
                <p>Klik tombol bookmark <i class="fa-regular fa-bookmark text-primary"></i> di sudut kanan atas kartu informasi atau materi manapun untuk menyimpannya di sini agar tidak hilang.</p>
            </div>`;
        return;
    }

    container.innerHTML = '';
    cards.forEach(card => {
        const row = document.createElement('div');
        row.className = 'saved-item-row';
        row.innerHTML = `
            <div class="saved-item-left">
                <span class="saved-item-badge"><i class="fa-solid fa-tag"></i> ${card.tabName || 'Portal'}</span>
                <h4 class="saved-item-title">${card.title}</h4>
                <p class="saved-item-snippet">${card.snippet ? (card.snippet.length > 120 ? card.snippet.slice(0, 120) + '...' : card.snippet) : 'Informasi resmi dari portal kampus.'}</p>
                <span class="saved-item-time"><i class="fa-regular fa-clock"></i> Disimpan pada ${card.savedAt || 'Hari ini'}</span>
            </div>
            <div class="saved-item-actions">
                <button type="button" class="btn btn-primary btn-sm btn-jump-saved" data-tab="${card.tabId}" data-id="${card.id}">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Buka
                </button>
                <button type="button" class="btn btn-sm btn-delete-saved" data-id="${card.id}" style="padding: 6px 12px; background: rgba(220,53,69,0.1); color: var(--danger-color); border: 1px solid rgba(220,53,69,0.25); border-radius: 8px;" title="Hapus dari tersimpan">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(row);
    });

    container.querySelectorAll('.btn-jump-saved').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            const targetId = btn.getAttribute('data-id');
            switchDashboardTab(targetTab);

            setTimeout(() => {
                const targetCard = document.querySelector(`[data-card-id="${targetId}"]`);
                if (targetCard) {
                    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetCard.classList.remove('card-highlight-pulse');
                    void targetCard.offsetWidth;
                    targetCard.classList.add('card-highlight-pulse');
                }
            }, 250);
        });
    });

    container.querySelectorAll('.btn-delete-saved').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-id');
            let cards = getSavedCards();
            cards = cards.filter(c => c.id !== targetId);
            saveSavedCards(cards);
            showAlert('Informasi dihapus dari daftar Tersimpan.', 'success');
        });
    });
}

// =============================================
// STUDENT NOTES SYSTEM (Buku Catatan Murid)
// =============================================

function getStudentNotes() {
    const saved = localStorage.getItem('portalStudentNotes');
    return saved ? JSON.parse(saved) : [];
}

function saveStudentNotes(notes) {
    localStorage.setItem('portalStudentNotes', JSON.stringify(notes));
    renderStudentNotesList();
}

function renderStudentNotesList() {
    const container = document.getElementById('studentNotesList');
    const badge = document.getElementById('notesCountBadge');
    if (!container) return;
    const notes = getStudentNotes();
    if (badge) badge.textContent = notes.length;

    if (notes.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.88rem; text-align: center; padding: 20px 0;">Belum ada catatan. Tambahkan catatan tugas atau pengingat baru di atas.</p>';
        return;
    }

    container.innerHTML = '';
    notes.forEach(note => {
        const div = document.createElement('div');
        div.className = 'student-note-card';
        div.innerHTML = `
            <div class="note-card-top">
                <span class="note-priority-tag note-tag-${note.priority || 'Umum'}">${getPriorityLabel(note.priority)}</span>
                <div class="note-card-actions">
                    <button type="button" class="btn-note-action btn-edit-note" data-id="${note.id}" title="Edit Catatan">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button type="button" class="btn-note-action btn-delete-note" data-id="${note.id}" title="Hapus Catatan">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            <h5 class="note-card-title">${note.title}</h5>
            <p class="note-card-content">${note.content}</p>
            <div class="note-card-footer">
                <small><i class="fa-regular fa-calendar-check"></i> ${note.date}</small>
            </div>
        `;
        container.appendChild(div);
    });

    container.querySelectorAll('.btn-edit-note').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const notes = getStudentNotes();
            const note = notes.find(n => n.id === id);
            if (!note) return;

            document.getElementById('studentNoteEditId').value = note.id;
            document.getElementById('noteTitleInput').value = note.title;
            document.getElementById('noteContentInput').value = note.content;
            document.getElementById('notePrioritySelect').value = note.priority || 'Tugas';
            document.getElementById('btnSaveStudentNote').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Perbarui Catatan';
            const resetBtn = document.getElementById('btnResetStudentNote');
            if (resetBtn) resetBtn.style.display = 'inline-flex';
        });
    });

    container.querySelectorAll('.btn-delete-note').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            let notes = getStudentNotes();
            notes = notes.filter(n => n.id !== id);
            saveStudentNotes(notes);
            showAlert('Catatan berhasil dihapus.', 'success');
        });
    });
}

function getPriorityLabel(priority) {
    switch (priority) {
        case 'Tugas': return '📝 Tugas Sekolah';
        case 'Penting': return '⭐ Sangat Penting';
        case 'Ujian': return '🎯 Persiapan Ujian';
        case 'Asrama': return '🏠 Kegiatan Asrama';
        default: return '📌 Catatan Umum';
    }
}

const studentNoteForm = document.getElementById('studentNoteForm');
const btnResetStudentNote = document.getElementById('btnResetStudentNote');
const btnExportNotes = document.getElementById('btnExportNotes');

if (btnResetStudentNote) {
    btnResetStudentNote.addEventListener('click', () => {
        studentNoteForm.reset();
        document.getElementById('studentNoteEditId').value = '';
        document.getElementById('btnSaveStudentNote').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Simpan Catatan';
        btnResetStudentNote.style.display = 'none';
    });
}

if (studentNoteForm) {
    studentNoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const editId = document.getElementById('studentNoteEditId').value.trim();
        const title = document.getElementById('noteTitleInput').value.trim();
        const content = document.getElementById('noteContentInput').value.trim();
        const priority = document.getElementById('notePrioritySelect').value;
        const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

        let notes = getStudentNotes();
        if (editId) {
            notes = notes.map(n => n.id === editId ? { ...n, title, content, priority, date } : n);
            showAlert(`Catatan "${title}" berhasil diperbarui!`, 'success');
        } else {
            notes.unshift({
                id: 'note-' + Date.now(),
                title,
                content,
                priority,
                date
            });
            showAlert(`Catatan "${title}" berhasil disimpan!`, 'success');
        }

        saveStudentNotes(notes);
        studentNoteForm.reset();
        document.getElementById('studentNoteEditId').value = '';
        document.getElementById('btnSaveStudentNote').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Simpan Catatan';
        if (btnResetStudentNote) btnResetStudentNote.style.display = 'none';
    });
}

if (btnExportNotes) {
    btnExportNotes.addEventListener('click', () => {
        const notes = getStudentNotes();
        const savedCards = getSavedCards();

        if (notes.length === 0 && savedCards.length === 0) {
            showAlert('Belum ada catatan atau informasi yang tersimpan untuk dicadangkan.', 'danger');
            return;
        }

        let fileText = `=================================================\n`;
        fileText += `CATATAN & INFORMASI TERSIMPAN - MAN ICT PORTAL\n`;
        fileText += `Diunduh pada: ${new Date().toLocaleString('id-ID')}\n`;
        fileText += `=================================================\n\n`;

        fileText += `--- DAFTAR INFORMASI TERSIMPAN (${savedCards.length}) ---\n`;
        savedCards.forEach((c, idx) => {
            fileText += `\n[${idx + 1}] ${c.title} (${c.tabName || 'Umum'})\n`;
            fileText += `Disimpan pada: ${c.savedAt || '-'}\n`;
            fileText += `Ringkasan: ${c.snippet || '-'}\n`;
        });

        fileText += `\n\n--- BUKU CATATAN PRIBADI MURID (${notes.length}) ---\n`;
        notes.forEach((n, idx) => {
            fileText += `\n[${idx + 1}] ${n.title} [${n.priority}]\n`;
            fileText += `Waktu: ${n.date}\n`;
            fileText += `Isi Catatan:\n${n.content}\n`;
        });

        fileText += `\n=================================================\n`;
        fileText += `MAN Insan Cendekia Tanah Laut - Portal Digital\n`;

        const blob = new Blob([fileText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Catatan_Murid_MAN_ICT_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showAlert('Catatan berhasil dicadangkan dan diunduh ke komputer Anda!', 'success');
    });
}

// =============================================
// CENTRAL SEARCH BAR SYSTEM (Search Bar di Tengah)
// =============================================

const portalSearchInput = document.getElementById('portalSearchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const searchResultsDropdown = document.getElementById('searchResultsDropdown');
const searchResultsList = document.getElementById('searchResultsList');
const searchResultsCount = document.getElementById('searchResultsCount');
const closeSearchResultsBtn = document.getElementById('closeSearchResultsBtn');
const quickOpenSavedBtn = document.getElementById('quickOpenSavedBtn');

function getAllSearchableItems() {
    const items = [];
    const cards = document.querySelectorAll('.dashboard .card');
    cards.forEach((card) => {
        if (card.closest('#tab-tersimpan')) return;
        const parentTab = card.closest('.tab-content');
        if (!parentTab) return;
        const tabId = parentTab.id.replace('tab-', '');

        let tabName = 'Portal';
        if (tabId === 'pengumuman') tabName = 'Pengumuman';
        else if (tabId === 'akademik') tabName = 'Akademik';
        else if (tabId === 'galeri') tabName = 'Galeri';
        else if (tabId === 'kontak') tabName = 'Kontak';
        else {
            const h2 = parentTab.querySelector('.section-title h2');
            if (h2) tabName = h2.textContent.trim().replace(/^[^a-zA-Z0-9]+/, '');
        }

        const titleEl = card.querySelector('h3') || card.querySelector('h4');
        const title = titleEl ? titleEl.textContent.trim() : '';
        const bodyEl = card.querySelector('p');
        const body = bodyEl ? bodyEl.textContent.trim() : '';

        let listText = '';
        card.querySelectorAll('.info-list li').forEach(li => {
            listText += ' ' + li.textContent.trim();
        });

        let cardId = card.getAttribute('data-card-id');
        if (!cardId) {
            cardId = 'card-' + tabId + '-' + title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30);
            card.setAttribute('data-card-id', cardId);
        }

        if (title || body || listText) {
            items.push({
                cardId,
                title,
                body: (body + ' ' + listText).trim(),
                tabId,
                tabName,
                element: card
            });
        }
    });

    return items;
}

function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightKeyword(text, keyword) {
    if (!keyword) return escapeHtml(text);
    const escapedText = escapeHtml(text);
    const escapedKw = escapeRegex(keyword);
    const regex = new RegExp(`(${escapedKw})`, 'gi');
    return escapedText.replace(regex, '<span class="search-keyword-highlight">$1</span>');
}

function performPortalSearch(query) {
    if (!query) {
        if (clearSearchBtn) clearSearchBtn.style.display = 'none';
        if (searchResultsDropdown) searchResultsDropdown.style.display = 'none';
        return;
    }

    if (clearSearchBtn) clearSearchBtn.style.display = 'inline-block';
    const items = getAllSearchableItems();
    const qLower = query.toLowerCase();

    const matches = items.filter(item => {
        return item.title.toLowerCase().includes(qLower) || item.body.toLowerCase().includes(qLower) || item.tabName.toLowerCase().includes(qLower);
    });

    if (searchResultsCount) searchResultsCount.textContent = matches.length;
    if (!searchResultsList || !searchResultsDropdown) return;
    searchResultsList.innerHTML = '';

    if (matches.length === 0) {
        searchResultsList.innerHTML = `
            <div style="padding: 20px; text-align: center; color: var(--text-secondary); font-size: 0.9rem;">
                <i class="fa-solid fa-circle-question" style="font-size: 1.5rem; color: var(--text-secondary); margin-bottom: 6px; display: block;"></i>
                Tidak ditemukan hasil untuk "<strong>${escapeHtml(query)}</strong>". Coba kata kunci lain.
            </div>`;
    } else {
        matches.forEach(item => {
            const div = document.createElement('div');
            div.className = 'search-result-item';

            const highlightedTitle = highlightKeyword(item.title, query);
            const snippet = item.body.length > 110 ? item.body.slice(0, 110) + '...' : item.body;
            const highlightedSnippet = highlightKeyword(snippet, query);

            div.innerHTML = `
                <div class="search-result-meta">
                    <span class="search-result-tab-badge">${item.tabName}</span>
                </div>
                <h5>${highlightedTitle}</h5>
                <p>${highlightedSnippet}</p>
            `;

            div.addEventListener('click', () => {
                switchDashboardTab(item.tabId);
                searchResultsDropdown.style.display = 'none';

                setTimeout(() => {
                    const targetEl = document.querySelector(`[data-card-id="${item.cardId}"]`) || item.element;
                    if (targetEl) {
                        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        targetEl.classList.remove('card-highlight-pulse');
                        void targetEl.offsetWidth;
                        targetEl.classList.add('card-highlight-pulse');
                    }
                }, 200);
            });

            searchResultsList.appendChild(div);
        });
    }

    searchResultsDropdown.style.display = 'block';
}

if (portalSearchInput) {
    portalSearchInput.addEventListener('input', (e) => {
        performPortalSearch(e.target.value.trim());
    });
}

if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
        portalSearchInput.value = '';
        performPortalSearch('');
        portalSearchInput.focus();
    });
}

if (closeSearchResultsBtn) {
    closeSearchResultsBtn.addEventListener('click', () => {
        if (searchResultsDropdown) searchResultsDropdown.style.display = 'none';
    });
}

document.addEventListener('click', (e) => {
    if (searchResultsDropdown && !searchResultsDropdown.contains(e.target) && e.target !== portalSearchInput) {
        searchResultsDropdown.style.display = 'none';
    }
});

if (quickOpenSavedBtn) {
    quickOpenSavedBtn.addEventListener('click', () => {
        switchDashboardTab('tersimpan');
    });
}

document.querySelectorAll('.search-shortcut-pill[data-target-tab]').forEach(pill => {
    pill.addEventListener('click', () => {
        const targetTab = pill.getAttribute('data-target-tab');
        if (targetTab) switchDashboardTab(targetTab);
    });
});

// Initial Setup Calls on Load
updateSavedCounters();
renderSavedCardsList();
renderStudentNotesList();
setTimeout(() => {
    initCardBookmarks();
}, 100);


