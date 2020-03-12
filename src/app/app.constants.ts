// export let serverurl = 'http://127.0.0.1:9000';
export let serverurl = 'http://127.0.0.1:8000';
// export let serverurl = 'http://192.168.200.119:8000';
// export let serverurl = 'http://192.168.1.41:5600';
// export let serverurl = 'http://192.168.214.181:9000';
export let API_VERSION = '/api/v1/';
export let loginurl = serverurl + API_VERSION +'authentication/login';
export let fileuploadurl = serverurl + API_VERSION +'edms/upload-document';
export let all_uploaded_documents_url = serverurl + API_VERSION +'edms/user-uploaded-documents/uploaded-documents';
export let pending_documents_url = serverurl + API_VERSION +'edms/user-uploaded-documents/pending-documents';
export let document_detail_url = serverurl + API_VERSION +'edms/document/document-detail';
export let fixed_boundary_document_post = serverurl + API_VERSION +'edms/document/post-fixed-survey-boundary-card';
export let rejected_documents_url = serverurl + API_VERSION +'edms/user-uploaded-documents/rejected-documents';
export let approved_documents_url = serverurl + API_VERSION +'edms/user-uploaded-documents/approved-documents';
export let clerk_analytics_url = serverurl + API_VERSION +'edms/user-uploaded-documents/clerk-analytics';
export let clerk_dashboard_analytics_url = serverurl + API_VERSION +'edms/user-uploaded-documents/clerk-analytics';
// ng build --prod --aot --build-optimizer  --output-path /Users/africancoder/Documents/edms_front_build --watch --output-hashing none