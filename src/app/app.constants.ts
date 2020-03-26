// export let serverurl = 'http://127.0.0.1:9000';
export let serverurl = 'http://127.0.0.1:8000';
// export let serverurl = 'http://192.168.200.119:8000';
// export let serverurl = 'http://192.168.1.41:5600';
// export let serverurl = 'http://192.168.214.151:8000';
// export let serverurl = 'http://192.168.17.226:8000';
export let API_VERSION = '/api/v1/';
export let loginurl = serverurl + API_VERSION +'authentication/login';
export let fileuploadurl = serverurl + API_VERSION +'edms/clerk-view/upload-document';
export let clerk_uploaded_documents_url = serverurl + API_VERSION +'edms/clerk-view/uploaded-documents';
export let clerk_pending_documents_url = serverurl + API_VERSION +'edms/clerk-view/pending-metadata-capture-documents';
export let document_detail_url = serverurl + API_VERSION +'edms/document/document-detail';
export let fixed_boundary_document_post = serverurl + API_VERSION +'edms/document/post-fixed-survey-boundary-card';
export let clerk_rejected_documents_url = serverurl + API_VERSION +'edms/clerk-view/rejected-documents';
export let clerk_approved_documents_url = serverurl + API_VERSION +'edms/clerk-view/approved-documents';
export let clerk_resubmitted_url = serverurl + API_VERSION +'edms/clerk-view/resubmitted-documents';
export let clerk_analytics_url = serverurl + API_VERSION +'edms/clerk-view/analytics';
export let clerk_dashboard_analytics_url = serverurl + API_VERSION + 'edms/clerk-view/analytics';

export let user_registration_form_url = serverurl + API_VERSION +'ict-support/user-registration-form';
export let list_user_roles = serverurl + API_VERSION + "account-management/list-roles";
export let list_departments = serverurl + API_VERSION + "department";
export let create_user_url = serverurl + API_VERSION + "ict-support/create-user";
// ng build --prod --aot --build-optimizer  --output-path /Users/africancoder/Documents/edms_front_build --watch --output-hashing none
export let list_staff_url = serverurl + API_VERSION + "account-management/filter-by-username";
export let swap_user_department_url = serverurl + API_VERSION +'ict-support/swap-user-department';
export let suspend_user_url = serverurl + API_VERSION +'ict-support/suspend-user';
export let unsuspend_user_url = serverurl + API_VERSION +'ict-support/un-suspend-user';
export let reset_password_url = serverurl + API_VERSION +'ict-support/reset-user-password';
export let get_user_details_url = serverurl + API_VERSION +'account-management/get-user-details';
export let change_password_url = serverurl + API_VERSION +'account-management/change-password';


export let validators_approved_documents_url = serverurl + API_VERSION +'edms/validator-view/approved-documents';
export let validators_rejected_documents_url = serverurl + API_VERSION +'edms/validator-view/rejected-documents';
export let validators_pending_validation_documents_url = serverurl + API_VERSION +'edms/validator-view/pending-validation-documents';
export let validators_dashboard_url = serverurl + API_VERSION +'edms/validator-view/analytics';
export let validators_approve_document_url = serverurl + API_VERSION +'edms/validator-view/approve-document';
export let validators_reject_document_url = serverurl + API_VERSION +'edms/validator-view/reject-document';



export let filter_document_by_file_url = serverurl + API_VERSION +'edms/document/filter-document-by-file-no';
export let fetch_document_records_url = serverurl + API_VERSION +'edms/document/fetch-document-records';
export let fetch_document_record_details_url = serverurl + API_VERSION +'edms/document/fetch-document-records-details';
export let fetch_user_document_types_url = serverurl + API_VERSION + 'edms/document-types/user-document-types';
export let fetch_document_type_fields_url = serverurl + API_VERSION + 'edms/document-types/get-document-fields';
export let post_document_fields_url = serverurl + API_VERSION + 'edms/clerk-view/post-document-records';
export let get_user_roles_url = serverurl + API_VERSION + 'account-management/list-user-roles';
export let edit_document_record_url = serverurl + API_VERSION + 'edms/clerk-view/edit-document-record';