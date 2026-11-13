export type SupportedLocale =
  | 'id'
  | 'en'
  | 'ms'
  | 'ja'
  | 'ko'
  | 'zh'
  | 'es'
  | 'fr'
  | 'de'
  | 'pt'
  | 'ar'
  | 'hi';

export interface Translations {
  appName: string;
  heroTitle: string;
  heroSubtitle: string;
  promptPlaceholder: string;
  promptHint: string;
  generateBtn: string;
  generatingBtn: string;
  generatingTitle: string;
  generatingSubtitle: string;
  newWebsiteBtn: string;
  copyCodeBtn: string;
  copiedCodeBtn: string;
  downloadHtmlBtn: string;
  publishBtn: string;
  deviceDesktop: string;
  deviceTablet: string;
  deviceMobile: string;
  chatTitle: string;
  chatSubtitle: string;
  chatPlaceholder: string;
  chatSendBtn: string;
  chatRevisingStatus: string;
  chatInitialAssistant: string;
  chatRevisionSuccess: string;
  chatRevisionError: string;
  publishModalTitle: string;
  publishModalDesc: string;
  subdomainLabel: string;
  subdomainPlaceholder: string;
  subdomainHint: string;
  publishCancelBtn: string;
  publishConfirmBtn: string;
  publishingBtn: string;
  publishSuccessTitle: string;
  publishSuccessDesc: string;
  openLiveSiteBtn: string;
  copyUrlBtn: string;
  copiedUrlBtn: string;
  closeBtn: string;
  installAppBtn: string;
  installIosBtn: string;
  iosGuideTitle: string;
  iosGuideStep1: string;
  iosGuideStep2: string;
  offlineBanner: string;
  errorEmptyPrompt: string;
  errorGeminiKey: string;
  errorNetlifyToken: string;
  errorNetlifyAuth: string;
  errorSubdomainTaken: string;
  errorInvalidSubdomain: string;
  errorGeneric: string;
  toastDownloaded: string;
  toastCopied: string;
}

const en: Translations = {
  appName: 'AI Generator Fully Website',
  heroTitle: 'Describe your website. AI builds it from scratch.',
  heroSubtitle:
    'Write any idea in plain language. Generate a complete, responsive single-page website, refine it through conversation, and publish live in one click.',
  promptPlaceholder:
    'Example: A minimalist architectural photography portfolio in Jakarta with dark slate tones, a full-bleed project showcase grid, pricing inquiry modal, and smooth scroll navigation...',
  promptHint: 'Ctrl + Enter or Cmd + Enter to generate',
  generateBtn: 'Generate Website',
  generatingBtn: 'Building Website...',
  generatingTitle: 'Crafting your website from scratch',
  generatingSubtitle: 'Designing layout, responsive styles, and interactive elements...',
  newWebsiteBtn: 'New Website',
  copyCodeBtn: 'Copy Code',
  copiedCodeBtn: 'Copied',
  downloadHtmlBtn: 'Download HTML',
  publishBtn: 'Publish Live',
  deviceDesktop: 'Desktop',
  deviceTablet: 'Tablet',
  deviceMobile: 'Mobile',
  chatTitle: 'AI Revisions',
  chatSubtitle: 'Ask AI to edit colors, text, layout, or add new sections',
  chatPlaceholder: 'e.g., Change the accent color to emerald, add a FAQ accordion...',
  chatSendBtn: 'Send',
  chatRevisingStatus: 'Applying changes to your website...',
  chatInitialAssistant:
    'Your website is ready in the live preview. Tell me anything you would like to change or add.',
  chatRevisionSuccess: 'Updated the website and refreshed the live preview.',
  chatRevisionError: 'Could not apply this revision. Please try again.',
  publishModalTitle: 'Publish to Live Web',
  publishModalDesc:
    'Deploy your generated website instantly with HTTPS enabled. No setup required.',
  subdomainLabel: 'Preferred Subdomain (Optional)',
  subdomainPlaceholder: 'my-awesome-site',
  subdomainHint: 'Leave blank to let Netlify assign a random URL automatically.',
  publishCancelBtn: 'Cancel',
  publishConfirmBtn: 'Publish Now',
  publishingBtn: 'Publishing...',
  publishSuccessTitle: 'Your website is live',
  publishSuccessDesc: 'Your site has been deployed and is accessible worldwide:',
  openLiveSiteBtn: 'Open Live Site',
  copyUrlBtn: 'Copy Link',
  copiedUrlBtn: 'Link Copied',
  closeBtn: 'Done',
  installAppBtn: 'Install App',
  installIosBtn: 'Install on iOS',
  iosGuideTitle: 'Install on iPhone or iPad',
  iosGuideStep1: 'Tap the Share icon in the Safari toolbar.',
  iosGuideStep2: 'Scroll down and select Add to Home Screen.',
  offlineBanner: 'You are currently offline. AI generation and publishing require an internet connection.',
  errorEmptyPrompt: 'Please describe the website you want to create.',
  errorGeminiKey: 'Gemini API key is not configured on the server.',
  errorNetlifyToken: 'Netlify access token is not configured on the server.',
  errorNetlifyAuth: 'Netlify authentication failed. Please verify the server token.',
  errorSubdomainTaken: 'That subdomain is already taken. Please try another name or leave it blank.',
  errorInvalidSubdomain: 'Subdomain must contain at least 3 letters or numbers.',
  errorGeneric: 'Something went wrong. Please try again.',
  toastDownloaded: 'Downloaded index.html',
  toastCopied: 'HTML code copied to clipboard',
};

const id: Translations = {
  appName: 'AI Generator Fully Website',
  heroTitle: 'Ceritakan ide website Anda. AI membangunnya dari nol.',
  heroSubtitle:
    'Ketik deskripsi website impian Anda dengan bebas. AI menghasilkan satu halaman web responsif yang utuh, bisa direvisi lewat obrolan, dan siap tayang dalam satu klik.',
  promptPlaceholder:
    'Contoh: Website kedai kopi artisan di Bandung dengan nuansa hangat minimalis, daftar menu interaktif, galeri suasana toko, dan formulir reservasi meja...',
  promptHint: 'Tekan Ctrl + Enter atau Cmd + Enter untuk mulai membuat',
  generateBtn: 'Buat Website Sekarang',
  generatingBtn: 'Sedang Membuat...',
  generatingTitle: 'Merancang website Anda dari nol',
  generatingSubtitle: 'Menyusun tata letak responsif, gaya visual, dan skrip interaktif...',
  newWebsiteBtn: 'Buat Baru',
  copyCodeBtn: 'Salin Kode',
  copiedCodeBtn: 'Tersalin',
  downloadHtmlBtn: 'Download HTML',
  publishBtn: 'Publikasikan',
  deviceDesktop: 'Desktop',
  deviceTablet: 'Tablet',
  deviceMobile: 'Mobile',
  chatTitle: 'Revisi AI',
  chatSubtitle: 'Minta AI mengubah warna, teks, tata letak, atau menambah bagian baru',
  chatPlaceholder: 'Misal: Ubah warna tombol jadi biru tua, tambahkan bagian testimoni...',
  chatSendBtn: 'Kirim',
  chatRevisingStatus: 'Menerapkan perubahan ke website Anda...',
  chatInitialAssistant:
    'Website Anda sudah tampil di pratinjau langsung. Ketik perintah revisi jika ingin mengubah warna, teks, atau menambah bagian baru.',
  chatRevisionSuccess: 'Perubahan berhasil diterapkan pada pratinjau langsung.',
  chatRevisionError: 'Gagal menerapkan revisi. Silakan coba lagi.',
  publishModalTitle: 'Publikasikan Website',
  publishModalDesc:
    'Tayangkan website hasil AI Anda secara instan dengan HTTPS aktif.',
  subdomainLabel: 'Nama Subdomain Pilihan (Opsional)',
  subdomainPlaceholder: 'nama-website-anda',
  subdomainHint: 'Kosongkan jika ingin Netlify membuatkan nama acak otomatis.',
  publishCancelBtn: 'Batal',
  publishConfirmBtn: 'Publikasikan Sekarang',
  publishingBtn: 'Memublikasikan...',
  publishSuccessTitle: 'Website berhasil tayang',
  publishSuccessDesc: 'Website Anda kini sudah aktif dan dapat diakses publik:',
  openLiveSiteBtn: 'Buka Website',
  copyUrlBtn: 'Salin Tautan',
  copiedUrlBtn: 'Tautan Tersalin',
  closeBtn: 'Selesai',
  installAppBtn: 'Instal Aplikasi',
  installIosBtn: 'Instal di iOS',
  iosGuideTitle: 'Instal di iPhone atau iPad',
  iosGuideStep1: 'Ketuk ikon Bagikan (Share) pada bilah Safari.',
  iosGuideStep2: 'Gulir ke bawah lalu pilih Tambahkan ke Layar Utama (Add to Home Screen).',
  offlineBanner: 'Anda sedang offline. Pembuatan AI dan publikasi memerlukan koneksi internet.',
  errorEmptyPrompt: 'Silakan tulis deskripsi ide website yang ingin dibuat.',
  errorGeminiKey: 'GEMINI_API_KEY belum diatur di server.',
  errorNetlifyToken: 'NETLIFY_ACCESS_TOKEN belum diatur di server.',
  errorNetlifyAuth: 'Autentikasi Netlify gagal. Periksa kembali token di server.',
  errorSubdomainTaken: 'Nama subdomain tersebut sudah dipakai. Silakan coba nama lain atau kosongkan.',
  errorInvalidSubdomain: 'Nama subdomain minimal harus 3 karakter huruf atau angka.',
  errorGeneric: 'Terjadi kesalahan. Silakan coba beberapa saat lagi.',
  toastDownloaded: 'File index.html berhasil diunduh',
  toastCopied: 'Kode HTML berhasil disalin',
};

const ms: Translations = {
  ...en,
  heroTitle: 'Terangkan laman web anda. AI membinanya dari kosong.',
  heroSubtitle:
    'Tulis sebarang idea dalam bahasa harian. Jana laman web responsif yang lengkap, ubah suai melalui perbualan, dan terbitkan secara langsung dalam satu klik.',
  promptPlaceholder:
    'Contoh: Laman web studio reka bentuk dalaman moden di Kuala Lumpur dengan galeri projek, senarai perkhidmatan, dan borang pertanyaan...',
  promptHint: 'Tekan Ctrl + Enter atau Cmd + Enter untuk menjana',
  generateBtn: 'Jana Laman Web',
  generatingBtn: 'Sedang Membina...',
  generatingTitle: 'Membina laman web anda dari kosong',
  generatingSubtitle: 'Menyusun reka letak responsif, gaya visual, dan elemen interaktif...',
  newWebsiteBtn: 'Laman Baharu',
  copyCodeBtn: 'Salin Kod',
  copiedCodeBtn: 'Disalin',
  downloadHtmlBtn: 'Muat Turun HTML',
  publishBtn: 'Terbitkan',
  chatTitle: 'Semakan AI',
  chatSubtitle: 'Minta AI menukar warna, teks, atau menambah bahagian baharu',
  chatPlaceholder: 'Contoh: Tukar warna tema kepada hijau gelap, tambah bahagian FAQ...',
  chatSendBtn: 'Hantar',
  chatRevisingStatus: 'Mengemas kini laman web anda...',
  chatInitialAssistant:
    'Laman web anda sedia dipratonton. Beritahu saya apa sahaja yang ingin anda ubah.',
  chatRevisionSuccess: 'Laman web dikemas kini dalam pratonton langsung.',
  publishModalTitle: 'Terbitkan ke Web',
  publishModalDesc: 'Lancarkan laman web anda serta-merta dengan HTTPS aktif.',
  subdomainLabel: 'Nama Subdomain Pilihan (Pilihan)',
  subdomainHint: 'Biarkan kosong untuk nama rawak automatik daripada Netlify.',
  publishCancelBtn: 'Batal',
  publishConfirmBtn: 'Terbitkan Sekarang',
  publishingBtn: 'Menerbitkan...',
  publishSuccessTitle: 'Laman web anda kini aktif',
  openLiveSiteBtn: 'Buka Laman',
  copyUrlBtn: 'Salin Pautan',
  copiedUrlBtn: 'Pautan Disalin',
  closeBtn: 'Selesai',
  installAppBtn: 'Pasang Aplikasi',
};

const ja: Translations = {
  ...en,
  heroTitle: 'アイデアを書くだけで、AIがゼロからWebサイトを構築。',
  heroSubtitle:
    '作りたいサイトのイメージを自由に入力してください。レスポンシブな単一HTMLサイトを即座に生成し、チャットで修正してワンクリックで公開できます。',
  promptPlaceholder:
    '例：東京のミニマルな建築写真ポートフォリオサイト。ダークスレート基調、プロジェクト一覧、問い合わせモーダル付き...',
  promptHint: 'Ctrl + Enter または Cmd + Enter で生成',
  generateBtn: 'サイトを生成する',
  generatingBtn: '生成中...',
  generatingTitle: 'Webサイトをゼロから構築中',
  generatingSubtitle: 'レイアウト、スタイル、インタラクティブ機能を設計しています...',
  newWebsiteBtn: '新規作成',
  copyCodeBtn: 'コードをコピー',
  copiedCodeBtn: 'コピー済み',
  downloadHtmlBtn: 'HTMLをダウンロード',
  publishBtn: '公開する',
  deviceDesktop: 'デスクトップ',
  deviceTablet: 'タブレット',
  deviceMobile: 'モバイル',
  chatTitle: 'AI修正チャット',
  chatSubtitle: '色やテキストの変更、セクションの追加を指示できます',
  chatPlaceholder: '例：メインカラーをティールに変更して、よくある質問を追加...',
  chatSendBtn: '送信',
  chatRevisingStatus: '変更を適用しています...',
  chatInitialAssistant: '右側のライブプレビューにサイトを表示しました。修正したい点があれば指示してください。',
  chatRevisionSuccess: 'サイトを更新し、プレビューを再読み込みしました。',
  publishModalTitle: 'Webに公開',
  publishModalDesc: '生成したWebサイトをHTTPS付きで即座に公開します。',
  subdomainLabel: '希望サブドメイン（任意）',
  subdomainHint: '空欄の場合、Netlifyが自動でランダムなURLを割り当てます。',
  publishCancelBtn: 'キャンセル',
  publishConfirmBtn: '今すぐ公開',
  publishingBtn: '公開中...',
  publishSuccessTitle: '公開が完了しました',
  publishSuccessDesc: '以下のURLからすぐにアクセスできます：',
  openLiveSiteBtn: 'サイトを開く',
  copyUrlBtn: 'URLをコピー',
  copiedUrlBtn: 'コピー済み',
  closeBtn: '閉じる',
  installAppBtn: 'アプリをインストール',
};

const ko: Translations = {
  ...en,
  heroTitle: '아이디어를 설명하면 AI가 처음부터 웹사이트를 만듭니다.',
  heroSubtitle:
    '원하는 웹사이트를 자유롭게 작성하세요. 반응형 단일 페이지 웹사이트를 즉시 생성하고, 대화로 수정하며, 한 번의 클릭으로 배포할 수 있습니다.',
  promptPlaceholder:
    '예: 서울의 미니멀한 스페셜티 카페 웹사이트. 따뜻한 배경, 인터랙티브 메뉴판, 매장 안내, 예약 문의 양식 포함...',
  promptHint: 'Ctrl + Enter 또는 Cmd + Enter로 생성',
  generateBtn: '웹사이트 생성',
  generatingBtn: '생성 중...',
  generatingTitle: '웹사이트를 처음부터 구축하는 중',
  generatingSubtitle: '레이아웃, 스타일 및 인터랙티브 기능을 작성하고 있습니다...',
  newWebsiteBtn: '새 웹사이트',
  copyCodeBtn: '코드 복사',
  copiedCodeBtn: '복사됨',
  downloadHtmlBtn: 'HTML 다운로드',
  publishBtn: '게시하기',
  deviceDesktop: '데스크톱',
  deviceTablet: '태블릿',
  deviceMobile: '모바일',
  chatTitle: 'AI 수정 요청',
  chatSubtitle: '색상, 텍스트 변경 또는 섹션 추가를 요청하세요',
  chatPlaceholder: '예: 포인트 색상을 변경하고 FAQ 섹션을 추가해 주세요...',
  chatSendBtn: '전송',
  chatRevisingStatus: '변경 사항을 적용하는 중...',
  chatInitialAssistant: '실시간 미리보기에 웹사이트가 준비되었습니다. 수정하고 싶은 내용을 말씀해 주세요.',
  chatRevisionSuccess: '웹사이트를 업데이트하고 미리보기를 새로 고쳤습니다.',
  publishModalTitle: '웹에 게시',
  publishModalDesc: '생성된 웹사이트를 HTTPS가 적용된 라이브 URL로 즉시 배포합니다.',
  subdomainLabel: '원하는 서브도메인 (선택)',
  subdomainHint: '비워 두면 Netlify가 임의의 URL을 자동으로 생성합니다.',
  publishCancelBtn: '취소',
  publishConfirmBtn: '지금 게시',
  publishingBtn: '게시 중...',
  publishSuccessTitle: '웹사이트가 게시되었습니다',
  publishSuccessDesc: '지금 바로 전 세계 어디서나 접속할 수 있습니다:',
  openLiveSiteBtn: '사이트 열기',
  copyUrlBtn: '링크 복사',
  copiedUrlBtn: '복사됨',
  closeBtn: '완료',
  installAppBtn: '앱 설치',
};

const zh: Translations = {
  ...en,
  heroTitle: '描述您的想法，AI 从零为您构建完整网站。',
  heroSubtitle:
    '用自然语言输入任何网站构想，即刻生成响应式单页网站，通过对话实时修改，并一键发布上线。',
  promptPlaceholder:
    '例如：一个极简风格的独立建筑设计工作室官网，包含作品集网格、团队介绍、服务流程和在线预约表单...',
  promptHint: '按 Ctrl + Enter 或 Cmd + Enter 开始生成',
  generateBtn: '立即生成网站',
  generatingBtn: '正在构建...',
  generatingTitle: '正在从零构建您的网站',
  generatingSubtitle: '正在设计响应式布局、视觉样式与交互功能...',
  newWebsiteBtn: '新建网站',
  copyCodeBtn: '复制代码',
  copiedCodeBtn: '已复制',
  downloadHtmlBtn: '下载 HTML',
  publishBtn: '一键发布',
  deviceDesktop: '桌面端',
  deviceTablet: '平板',
  deviceMobile: '手机',
  chatTitle: 'AI 修改对话',
  chatSubtitle: '让 AI 调整配色、修改文案或添加新板块',
  chatPlaceholder: '例如：把主色调改成深蓝，并增加常见问题板块...',
  chatSendBtn: '发送',
  chatRevisingStatus: '正在应用修改...',
  chatInitialAssistant: '网站已生成并在右侧实时预览。如需调整颜色、文字或结构，请直接告诉我。',
  chatRevisionSuccess: '已更新网站并刷新实时预览。',
  publishModalTitle: '发布到线上',
  publishModalDesc: '立即将生成的网站部署为支持 HTTPS 的在线页面。',
  subdomainLabel: '自定义子域名（可选）',
  subdomainHint: '留空将由 Netlify 自动分配随机域名。',
  publishCancelBtn: '取消',
  publishConfirmBtn: '立即发布',
  publishingBtn: '发布中...',
  publishSuccessTitle: '网站已成功上线',
  publishSuccessDesc: '您的网站现已部署完成，可立即访问：',
  openLiveSiteBtn: '访问网站',
  copyUrlBtn: '复制链接',
  copiedUrlBtn: '已复制链接',
  closeBtn: '完成',
  installAppBtn: '安装应用',
};

const es: Translations = {
  ...en,
  heroTitle: 'Describe tu sitio web. La IA lo crea desde cero.',
  heroSubtitle:
    'Escribe cualquier idea con tus propias palabras. Genera una web responsiva completa, ajústala conversando con la IA y publícala en un clic.',
  promptPlaceholder:
    'Ejemplo: Portafolio minimalista para un estudio de diseño industrial con galería interactiva, precios y formulario de contacto...',
  promptHint: 'Ctrl + Enter o Cmd + Enter para generar',
  generateBtn: 'Crear Sitio Web',
  generatingBtn: 'Construyendo...',
  generatingTitle: 'Creando tu sitio web desde cero',
  generatingSubtitle: 'Diseñando estructura responsiva, estilos e interactividad...',
  newWebsiteBtn: 'Nuevo Sitio',
  copyCodeBtn: 'Copiar Código',
  copiedCodeBtn: 'Copiado',
  downloadHtmlBtn: 'Descargar HTML',
  publishBtn: 'Publicar',
  deviceDesktop: 'Escritorio',
  deviceTablet: 'Tableta',
  deviceMobile: 'Móvil',
  chatTitle: 'Revisiones IA',
  chatSubtitle: 'Pide cambios de color, texto, diseño o nuevas secciones',
  chatPlaceholder: 'Ej.: Cambia el color principal a azul marino y añade preguntas frecuentes...',
  chatSendBtn: 'Enviar',
  chatRevisingStatus: 'Aplicando cambios...',
  chatInitialAssistant: 'Tu sitio web está listo en la vista previa. Dime qué quieres modificar o añadir.',
  chatRevisionSuccess: 'Sitio actualizado en la vista previa.',
  publishModalTitle: 'Publicar Sitio Web',
  publishModalDesc: 'Despliega tu web al instante con certificado HTTPS.',
  subdomainLabel: 'Subdominio preferido (Opcional)',
  subdomainHint: 'Déjalo vacío para que Netlify asigne un nombre aleatorio.',
  publishCancelBtn: 'Cancelar',
  publishConfirmBtn: 'Publicar Ahora',
  publishingBtn: 'Publicando...',
  publishSuccessTitle: 'Tu sitio web está en línea',
  openLiveSiteBtn: 'Abrir Sitio',
  copyUrlBtn: 'Copiar Enlace',
  copiedUrlBtn: 'Enlace Copiado',
  closeBtn: 'Listo',
  installAppBtn: 'Instalar App',
};

const fr: Translations = {
  ...en,
  heroTitle: 'Décrivez votre site web. L’IA le crée de zéro.',
  heroSubtitle:
    'Écrivez votre idée librement. Générez un site responsive complet, affinez-le par discussion et publiez-le en un clic.',
  promptPlaceholder:
    'Exemple : Site vitrine minimaliste pour un artisan boulanger à Lyon avec menu du jour, galerie et formulaire de commande...',
  generateBtn: 'Générer le site',
  generatingBtn: 'Création en cours...',
  newWebsiteBtn: 'Nouveau site',
  copyCodeBtn: 'Copier le code',
  copiedCodeBtn: 'Copié',
  downloadHtmlBtn: 'Télécharger HTML',
  publishBtn: 'Publier',
  deviceDesktop: 'Bureau',
  deviceTablet: 'Tablette',
  deviceMobile: 'Mobile',
  chatTitle: 'Révisions IA',
  chatSubtitle: 'Demandez des modifications de couleurs, textes ou sections',
  chatSendBtn: 'Envoyer',
  publishModalTitle: 'Publier en ligne',
  subdomainLabel: 'Sous-domaine souhaité (Optionnel)',
  publishCancelBtn: 'Annuler',
  publishConfirmBtn: 'Publier maintenant',
  publishingBtn: 'Publication...',
  publishSuccessTitle: 'Votre site est en ligne',
  openLiveSiteBtn: 'Ouvrir le site',
  copyUrlBtn: 'Copier le lien',
  copiedUrlBtn: 'Lien copié',
  closeBtn: 'Terminer',
  installAppBtn: 'Installer l’app',
};

const de: Translations = {
  ...en,
  heroTitle: 'Beschreibe deine Website. KI baut sie von Grund auf.',
  heroSubtitle:
    'Formuliere jede Idee frei. Erstelle eine vollständige responsive Website, passe sie im Chat an und veröffentliche sie mit einem Klick.',
  generateBtn: 'Website erstellen',
  generatingBtn: 'Wird erstellt...',
  newWebsiteBtn: 'Neue Website',
  copyCodeBtn: 'Code kopieren',
  copiedCodeBtn: 'Kopiert',
  downloadHtmlBtn: 'HTML herunterladen',
  publishBtn: 'Veröffentlichen',
  chatTitle: 'KI-Überarbeitung',
  chatSendBtn: 'Senden',
  publishModalTitle: 'Website veröffentlichen',
  subdomainLabel: 'Wunsch-Subdomain (Optional)',
  publishCancelBtn: 'Abbrechen',
  publishConfirmBtn: 'Jetzt veröffentlichen',
  publishingBtn: 'Wird veröffentlicht...',
  publishSuccessTitle: 'Deine Website ist live',
  openLiveSiteBtn: 'Website öffnen',
  copyUrlBtn: 'Link kopieren',
  copiedUrlBtn: 'Link kopiert',
  closeBtn: 'Fertig',
  installAppBtn: 'App installieren',
};

const pt: Translations = {
  ...en,
  heroTitle: 'Descreva seu site. A IA constrói do zero.',
  heroSubtitle:
    'Escreva qualquer ideia com suas palavras. Gere um site responsivo completo, ajuste conversando com a IA e publique com um clique.',
  generateBtn: 'Gerar Site',
  generatingBtn: 'Construindo...',
  newWebsiteBtn: 'Novo Site',
  copyCodeBtn: 'Copiar Código',
  copiedCodeBtn: 'Copiado',
  downloadHtmlBtn: 'Baixar HTML',
  publishBtn: 'Publicar',
  deviceDesktop: 'Desktop',
  deviceTablet: 'Tablet',
  deviceMobile: 'Celular',
  chatTitle: 'Revisões IA',
  chatSendBtn: 'Enviar',
  publishModalTitle: 'Publicar Site',
  subdomainLabel: 'Subdomínio preferido (Opcional)',
  publishCancelBtn: 'Cancelar',
  publishConfirmBtn: 'Publicar Agora',
  publishingBtn: 'Publicando...',
  publishSuccessTitle: 'Seu site está no ar',
  openLiveSiteBtn: 'Abrir Site',
  copyUrlBtn: 'Copiar Link',
  copiedUrlBtn: 'Link Copiado',
  closeBtn: 'Concluir',
  installAppBtn: 'Instalar App',
};

const ar: Translations = {
  ...en,
  heroTitle: 'صِف فكرة موقعك. والذكاء الاصطناعي يبنيه من الصفر.',
  heroSubtitle:
    'اكتب أي فكرة بأسلوبك. أنشئ موقعاً متجاوباً متكاملاً، عدّله عبر المحادثة، وانشره مباشرة بنقرة واحدة.',
  generateBtn: 'إنشاء الموقع',
  generatingBtn: 'جارٍ البناء...',
  newWebsiteBtn: 'موقع جديد',
  copyCodeBtn: 'نسخ الكود',
  copiedCodeBtn: 'تم النسخ',
  downloadHtmlBtn: 'تنزيل HTML',
  publishBtn: 'نشر الموقع',
  deviceDesktop: 'سطح المكتب',
  deviceTablet: 'جهاز لوحي',
  deviceMobile: 'جوال',
  chatTitle: 'تعديلات الذكاء الاصطناعي',
  chatSendBtn: 'إرسال',
  publishModalTitle: 'نشر الموقع على الويب',
  subdomainLabel: 'النطاق الفرعي المفضل (اختياري)',
  publishCancelBtn: 'إلغاء',
  publishConfirmBtn: 'نشر الآن',
  publishingBtn: 'جارٍ النشر...',
  publishSuccessTitle: 'موقعك متاح الآن على الإنترنت',
  openLiveSiteBtn: 'فتح الموقع',
  copyUrlBtn: 'نسخ الرابط',
  copiedUrlBtn: 'تم نسخ الرابط',
  closeBtn: 'تم',
  installAppBtn: 'تثبيت التطبيق',
};

const hi: Translations = {
  ...en,
  heroTitle: 'अपनी वेबसाइट का विचार लिखें। AI इसे बिल्कुल नए सिरे से बनाएगा।',
  heroSubtitle:
    'सरल भाषा में कोई भी विचार लिखें। तुरंत रिस्पॉन्सिव वेबसाइट बनाएं, चैट के ज़रिए बदलाव करें और एक क्लिक में लाइव पब्लिश करें।',
  generateBtn: 'वेबसाइट बनाएं',
  generatingBtn: 'वेबसाइट बन रही है...',
  newWebsiteBtn: 'नई वेबसाइट',
  copyCodeBtn: 'कोड कॉपी करें',
  copiedCodeBtn: 'कॉपी हो गया',
  downloadHtmlBtn: 'HTML डाउनलोड करें',
  publishBtn: 'पब्लिश करें',
  chatTitle: 'AI संशोधन',
  chatSendBtn: 'भेजें',
  publishModalTitle: 'लाइव वेब पर पब्लिश करें',
  subdomainLabel: 'पसंदीदा सबडोमेन (वैकल्पिक)',
  publishCancelBtn: 'रद्द करें',
  publishConfirmBtn: 'अभी पब्लिश करें',
  publishingBtn: 'पब्लिश हो रहा है...',
  publishSuccessTitle: 'आपकी वेबसाइट लाइव है',
  openLiveSiteBtn: 'वेबसाइट खोलें',
  copyUrlBtn: 'लिंक कॉपी करें',
  copiedUrlBtn: 'लिंक कॉपी हो गया',
  closeBtn: 'पूर्ण',
  installAppBtn: 'ऐप इंस्टॉल करें',
};

const TRANSLATIONS: Record<SupportedLocale, Translations> = {
  id,
  en,
  ms,
  ja,
  ko,
  zh,
  es,
  fr,
  de,
  pt,
  ar,
  hi,
};

export function detectDeviceLocale(): { locale: SupportedLocale; rawLanguage: string; dir: 'ltr' | 'rtl' } {
  if (typeof navigator === 'undefined') {
    return { locale: 'en', rawLanguage: 'en', dir: 'ltr' };
  }

  const rawLanguage = (navigator.languages?.[0] || navigator.language || 'en').trim();
  const baseCode = rawLanguage.toLowerCase().split(/[-_]/)[0] as SupportedLocale;

  const locale: SupportedLocale = baseCode in TRANSLATIONS ? baseCode : 'en';
  const dir: 'ltr' | 'rtl' = locale === 'ar' ? 'rtl' : 'ltr';

  return { locale, rawLanguage, dir };
}

export function getTranslations(locale: SupportedLocale): Translations {
  return TRANSLATIONS[locale] || TRANSLATIONS.en;
}
