
// export let serverurl = 'http://192.168.17.232:5600';
// export let serverurl = 'http://192.168.18.52:8000';
// export let serverurl = 'http://192.168.17.240:5600';
// export let serverurl = 'http://192.168.17.243:5600';
// export let serverurl = 'http://192.168.214.140:8000';
// export let serverurl = 'http://127.0.0.1:8000';
// export let serverurl = 'http://192.168.18.89:8000';
// export let serverurl = 'http://192.168.17.133:8000';


// export let serverurl = 'http://192.168.17.228:5600';
export let serverurl = 'http://192.168.17.228:5600';
export let API_VERSION = '/api/v1/';
export let loginurl = serverurl + API_VERSION + 'authentication/login';
export let fileuploadurl = serverurl + API_VERSION + 'edms/clerk-view/upload-document';
export let clerk_uploaded_documents_url = serverurl + API_VERSION + 'edms/clerk-view/uploaded-documents';
export let clerk_pending_documents_url = serverurl + API_VERSION + 'edms/clerk-view/pending-metadata-capture-documents';
export let document_detail_url = serverurl + API_VERSION + 'edms/document/document-detail';
export let fixed_boundary_document_post = serverurl + API_VERSION + 'edms/document/post-fixed-survey-boundary-card';
export let clerk_rejected_documents_url = serverurl + API_VERSION + 'edms/clerk-view/rejected-documents';
export let clerk_approved_documents_url = serverurl + API_VERSION + 'edms/clerk-view/approved-documents';
export let clerk_resubmitted_url = serverurl + API_VERSION + 'edms/clerk-view/resubmitted-documents';
export let clerk_resubmit_document_url = serverurl + API_VERSION + 'edms/clerk-view/resubmit-document';
export let clerk_analytics_url = serverurl + API_VERSION + 'edms/clerk-view/analytics';
export let clerk_dashboard_analytics_url = serverurl + API_VERSION + 'edms/clerk-view/analytics';

export let user_registration_form_url = serverurl + API_VERSION + 'ict-support/user-registration-form';
export let list_user_roles = serverurl + API_VERSION + 'account-management/list-roles';
export let list_departments = serverurl + API_VERSION + 'department';
export let create_user_url = serverurl + API_VERSION + 'ict-support/create-user';
// ng build --prod --aot --build-optimizer  --output-path /Users/africancoder/Documents/edms_front_build --watch --output-hashing none
export let list_staff_url = serverurl + API_VERSION + 'account-management/filter-by-username';
export let swap_user_department_url = serverurl + API_VERSION + 'ict-support/swap-user-department';
export let suspend_user_url = serverurl + API_VERSION + 'ict-support/suspend-user';
export let unsuspend_user_url = serverurl + API_VERSION + 'ict-support/un-suspend-user';
export let reset_password_url = serverurl + API_VERSION + 'ict-support/reset-user-password';
export let get_user_details_url = serverurl + API_VERSION + 'account-management/get-user-details';
export let change_password_url = serverurl + API_VERSION + 'account-management/change-password';
export let edit_user_url = serverurl + API_VERSION + 'ict-support/edit-user';



export let validators_approved_documents_url = serverurl + API_VERSION + 'edms/validator-view/approved-documents';
export let validators_rejected_documents_url = serverurl + API_VERSION + 'edms/validator-view/rejected-documents';
export let validators_pending_validation_documents_url = serverurl + API_VERSION + 'edms/validator-view/pending-validation-documents';
export let validators_dashboard_url = serverurl + API_VERSION + 'edms/validator-view/analytics';
export let validators_approve_document_url = serverurl + API_VERSION + 'edms/validator-view/approve-document';
export let validators_reject_document_url = serverurl + API_VERSION + 'edms/validator-view/reject-document';



export let filter_document_by_file_url = serverurl + API_VERSION + 'edms/document/filter-document-by-file-no';
export let fetch_document_records_url = serverurl + API_VERSION + 'edms/document/fetch-document-records';
export let fetch_document_record_details_url = serverurl + API_VERSION + 'edms/document/fetch-document-records-details';
export let fetch_user_document_types_url = serverurl + API_VERSION + 'edms/document-types/user-document-types';
export let fetch_document_type_fields_url = serverurl + API_VERSION + 'edms/document-types/get-document-fields';
export let post_document_fields_url = serverurl + API_VERSION + 'edms/clerk-view/post-document-records';
export let get_user_roles_url = serverurl + API_VERSION + 'account-management/list-user-roles';
export let edit_document_record_url = serverurl + API_VERSION + 'edms/clerk-view/edit-document-record';


export let document_status_analytics_url = serverurl + API_VERSION + 'analytics/list-document-status';

export let list_data_clerks_url = serverurl + API_VERSION + 'analytics/list-data-clerks';
export let list_data_validators_url = serverurl + API_VERSION + 'analytics/list-data-validators';
export let list_departments_url = serverurl + API_VERSION + 'analytics/list-departments';


export let data_clerk_analytics_url = serverurl + API_VERSION + 'analytics/data-clerk-analytics';
export let data_validators_analytics_url = serverurl + API_VERSION + 'analytics/data-validator-analytics';
export let data_department_analytics_url = serverurl + API_VERSION + 'analytics/department-analytics';
export let data_document_status_analytics_url = serverurl + API_VERSION + 'analytics/document-status-analytics';

export let list_document_by_file_number_url = serverurl + API_VERSION + 'edms/document/filter-document-by-file-no';

export let create_department_url = serverurl + API_VERSION + 'edms/department/create';
export let edit_department_url = serverurl + API_VERSION + 'edms/department/edit-view';
export let list_department_url = serverurl + API_VERSION + 'edms/department/list-departments';
export let delete_department_url = serverurl + API_VERSION + 'edms/department/delete-view';
export let department_detail_url = serverurl + API_VERSION + 'edms/department/detail-view';


export let list_document_types_url = serverurl + API_VERSION + 'edms/document-types-config/list-document-types';
export let create_document_types_url = serverurl + API_VERSION + 'edms/document-types-config/create';
export let edit_document_types_url = serverurl + API_VERSION + 'edms/document-types-config/edit-view';
export let delete_document_types_url = serverurl + API_VERSION + 'edms/document-types-config/delete-view';
export let detail_document_types_url = serverurl + API_VERSION + 'edms/document-types-config/detail-view';


export let list_document_fields_url = serverurl + API_VERSION + 'edms/document-fields-config/list-document-fields';
export let create_document_fields_url = serverurl + API_VERSION + 'edms/document-fields-config/create';
export let edit_document_fields_url = serverurl + API_VERSION + 'edms/document-fields-config/edit-view';
export let delete_document_fields_url = serverurl + API_VERSION + 'edms/document-fields-config/delete-view';
export let detail_document_fields_url = serverurl + API_VERSION + 'edms/document-fields-config/detail-view';

export let list_input_types_url = serverurl + API_VERSION + 'edms/document-fields-config/list-input-types';
export let revoke_document_url = serverurl + API_VERSION + 'edms/document/revoke-document';

export let cleaner_post_validation_data_url = serverurl + API_VERSION + 'data-cleaning/post-cleaning-dataset-record';


export let award_user_role_url = serverurl + API_VERSION + 'ict-support/award-role';
export let revoke_user_role_url = serverurl + API_VERSION + 'ict-support/revoke-role';

export let data_cleaning_file_filter_url = serverurl + API_VERSION + 'data-cleaning/filter-document-by-file-no';


// ng serve --host 0.0.0.0
