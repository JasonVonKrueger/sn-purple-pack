import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    '2e1a5a7e47398310b1197bb4416d43c7': {
                        table: 'sys_hub_flow_snapshot'
                        id: '2e1a5a7e47398310b1197bb4416d43c7'
                        deleted: true
                    }
                    '311ad67e47398310b1197bb4416d43f9': {
                        table: 'sys_hub_flow_snapshot'
                        id: '311ad67e47398310b1197bb4416d43f9'
                        deleted: true
                    }
                    '3ecce4a76feb4f4f8215c02c39d0e35b': {
                        table: 'sys_hub_action_instance_v2'
                        id: '3ecce4a76feb4f4f8215c02c39d0e35b'
                        deleted: true
                    }
                    '597e5293d6094ca79057b22f30da542a': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '597e5293d6094ca79057b22f30da542a'
                        deleted: true
                    }
                    a0f78c1b47754710b1197bb4416d43f8: {
                        table: 'sys_hub_flow_snapshot'
                        id: 'a0f78c1b47754710b1197bb4416d43f8'
                        deleted: true
                    }
                    approval_accepted: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '597e5293d6094ca79057b22f30da542a'
                        deleted: true
                    }
                    approval_rejected: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'de562bb27e68488697e12616379564b3'
                        deleted: true
                    }
                    approve_integration_creation: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'fc2c4031439e4b8d8f14b26861f33c1f'
                        deleted: true
                    }
                    assign_integration_outputs: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '27ade3a86ca44f23820c245dc3861bdf'
                    }
                    assign_rejected_outputs: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'ecfa61882a894fad9d03a3f47ef962dd'
                        deleted: true
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '12aab1ab858c4a1b9d2d6bb584440813'
                    }
                    call_create_integration: {
                        table: 'sys_hub_sub_flow_instance_v2'
                        id: '0408b6dbd612424d9a2af0321bd49592'
                    }
                    check_integration_success: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '14fb08897fe7408db365947af1753ca9'
                    }
                    create_oauth_app: {
                        table: 'sys_hub_action_instance_v2'
                        id: '5cf37a9a09444fb1a968c5f575f6dce2'
                    }
                    create_service_account: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'f6686bb91d624ccdb38d2e6f8486ea49'
                    }
                    de562bb27e68488697e12616379564b3: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'de562bb27e68488697e12616379564b3'
                        deleted: true
                    }
                    ecfa61882a894fad9d03a3f47ef962dd: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'ecfa61882a894fad9d03a3f47ef962dd'
                        deleted: true
                    }
                    fc2c4031439e4b8d8f14b26861f33c1f: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'fc2c4031439e4b8d8f14b26861f33c1f'
                        deleted: true
                    }
                    gitlab_branch: {
                        table: 'sys_properties'
                        id: 'bb2f1b5a82354d77a6a0892de81adaf5'
                    }
                    gitlab_committer: {
                        table: 'sys_script_include'
                        id: '351753adbdda4a5f8dff8e9fb7383b47'
                    }
                    gitlab_directory: {
                        table: 'sys_properties'
                        id: 'b7e3fdcde46849b9b48a69981c63f421'
                    }
                    gitlab_project_id: {
                        table: 'sys_properties'
                        id: 'f5084c07f30f4f26bfd924dd18f1b73e'
                    }
                    gitlab_token: {
                        table: 'sys_properties'
                        id: '3f9e3193117b439bab10bda886e1908c'
                    }
                    gitlab_url: {
                        table: 'sys_properties'
                        id: 'f0f71971dd374d39a5d14ebb29f44505'
                    }
                    integration_failed: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '9b89845c99c0477d9feb9daedce2bc51'
                    }
                    log_failure: {
                        table: 'sys_hub_action_instance_v2'
                        id: '87a5adafc92f4cacbe35e7ed188b6db3'
                    }
                    log_integration_created: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'ceae0ded463e4e08aff220f9507816ec'
                    }
                    log_integration_not_approved: {
                        table: 'sys_hub_action_instance_v2'
                        id: '3ecce4a76feb4f4f8215c02c39d0e35b'
                        deleted: true
                    }
                    log_success: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'b451e12c53934f08883e3e4ed416438a'
                    }
                    log_syslog_results: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'a1b2c3d4e5f647389abcdef012345602'
                    }
                    lookup_syslog_records: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'a1b2c3d4e5f647389abcdef012345601'
                    }
                    new_integration_request: {
                        table: 'sc_cat_item'
                        id: '519f41f556654a2ca87fbf08064a02ba'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '531f53a3d5ea4e8b81b3490179a9fcad'
                    }
                    pp_create_integration_subflow: {
                        table: 'sys_hub_flow'
                        id: '583df9f6e6af4b54ac3f430b361ae4b1'
                    }
                    pp_get_syslog_flow: {
                        table: 'sys_hub_flow'
                        id: 'a1b2c3d4e5f647389abcdef012345600'
                    }
                    purple_pack_flow: {
                        table: 'sys_hub_flow'
                        id: 'c5a20f8a14654ff5ad64263b7dc05446'
                    }
                    'request-peer-review-ui-action': {
                        table: 'sys_ui_action'
                        id: 'b2d3e4f5a6b74c8d9e0f1a2b3c4d5e6f'
                    }
                    'scan-and-deploy-ui-action': {
                        table: 'sys_ui_action'
                        id: 'ac915d006e8e4a46a638177511a9cce5'
                    }
                    'src_server_script-includes_gitlab-committer_js': {
                        table: 'sys_module'
                        id: 'f68f12773414447585ef177243d0a03f'
                    }
                    trg_get_syslog_api: {
                        table: 'sys_hub_trigger_instance_v2'
                        id: 'a1b2c3d4e5f647389abcdef012345603'
                        deleted: true
                    }
                    trg_service_account_created: {
                        table: 'sys_hub_trigger_instance_v2'
                        id: '38acf7f34bf641dc9257e833bafa334d'
                    }
                }
                composite: [
                    {
                        table: 'item_option_new'
                        id: '019868bc45ac4347aa62bfc4d7e390cb'
                        key: {
                            cat_item: '519f41f556654a2ca87fbf08064a02ba'
                            variable_set: 'NULL'
                            name: 'short_description'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '043f2a27008e4780adfc7701b0366aec'
                        key: {
                            cat_item: '519f41f556654a2ca87fbf08064a02ba'
                            variable_set: 'NULL'
                            name: 'acknowledge'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '061a1a7e47398310b1197bb4416d4354'
                        deleted: true
                        key: {
                            model: '311ad67e47398310b1197bb4416d43f9'
                            element: 'success'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '0c7dc3f233a641f68da67cdadf736149'
                        key: {
                            model: '583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'first_name'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '0dfa34397c6949d38c2b20243b64523b'
                        deleted: false
                        key: {
                            model: '583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'email'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '101a26c7d93a418eac5f8c01abb242c1'
                        key: {
                            name: 'u_peer_review'
                            element: 'review_comments'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '13da4c044706cb10b1197bb4416d434d'
                        deleted: false
                        key: {
                            name: 'var__m_sys_hub_flow_input_5fda4c044706cb10b1197bb4416d4303'
                            element: 'oauth_app_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '15ef64d8a9864e96ae7e0403c9ad5c20'
                        key: {
                            model: '583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'username'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '184f672ad69247799d6d0902f3d47352'
                        key: {
                            name: 'u_peer_review'
                            element: 'update_set_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1a6e3304c37c494ba0c774468a9c7106'
                        key: {
                            name: 'var__m_sys_hub_flow_output_583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'oauth_app_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1b4cfaf59e134b38b7414543176165b7'
                        key: {
                            name: 'u_peer_review'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '1bda4c044706cb10b1197bb4416d433a'
                        deleted: false
                        key: {
                            model: '5fda4c044706cb10b1197bb4416d4303'
                            element: 'last_name'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '1c9d8330e10e4d8aa3a9e165d3c17924'
                        key: {
                            name: 'global/scan_and_deploy_main.js.map'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '21488e21b19f4c11a3b8978770f7780c'
                        key: {
                            name: 'u_peer_review'
                            element: 'status'
                            value: 'rejected'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '21becb11ef8a4fed95ef808b94f76adf'
                        key: {
                            application_file: 'fd88d46841684be8917b17350d41306b'
                            source_artifact: '70d9cc61cac14e4fb547afa907d08514'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '261a5a7e47398310b1197bb4416d43d6'
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_input_2e1a5a7e47398310b1197bb4416d43c7'
                            element: 'current'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2bda4c044706cb10b1197bb4416d437f'
                        deleted: false
                        key: {
                            name: 'var__m_sys_hub_flow_output_5fda4c044706cb10b1197bb4416d4303'
                            element: 'service_account_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '319cfbff282046efaa381d790213c1a6'
                        key: {
                            name: 'u_peer_review'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '31d3bc9cfdef495c8cd49c1518bb6332'
                        key: {
                            cat_item: '519f41f556654a2ca87fbf08064a02ba'
                            variable_set: 'NULL'
                            name: 'integration_owner'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '331e018e316446e3afbe65e9616b2b4b'
                        key: {
                            name: 'var__m_sys_hub_flow_input_583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'first_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '36ea44b66cf8423590c377192c8e7b5e'
                        deleted: false
                        key: {
                            name: 'var__m_sys_hub_flow_input_583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '391a1a7e47398310b1197bb4416d4313'
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_input_311ad67e47398310b1197bb4416d43f9'
                            element: 'first_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '3a1a5a7e47398310b1197bb4416d43da'
                        deleted: true
                        key: {
                            model: '2e1a5a7e47398310b1197bb4416d43c7'
                            element: 'table_name'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '3ab32b2402294bb39c52ea1391a2a286'
                        deleted: true
                        key: {
                            model: '583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'manager'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '3c243be189fd4a2b9517bdaa462eb325'
                        key: {
                            application_file: '5e9650a712d34217a85cfe040a84e4f2'
                            source_artifact: 'a66541a70ac54695a84bfcc46203041d'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3c66fb61e4a94701867ed75231008798'
                        key: {
                            name: 'u_peer_review'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '3d1a1a7e47398310b1197bb4416d4317'
                        deleted: true
                        key: {
                            model: '311ad67e47398310b1197bb4416d43f9'
                            element: 'last_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3e37812b9f5944b6bc3903d4922b2689'
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_input_583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'integration_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '421a1a7e47398310b1197bb4416d4339'
                        deleted: true
                        key: {
                            model: '311ad67e47398310b1197bb4416d43f9'
                            element: 'redirect_url'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '421a1a7e47398310b1197bb4416d4367'
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_output_311ad67e47398310b1197bb4416d43f9'
                            element: 'service_account_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '42a5bb02cccb40f9b25e012ab29fd737'
                        key: {
                            model: '583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'oauth_app_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4529a0623b1d488ba739123b6952e2e2'
                        key: {
                            name: 'u_peer_review'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '461a1a7e47398310b1197bb4416d436b'
                        deleted: true
                        key: {
                            model: '311ad67e47398310b1197bb4416d43f9'
                            element: 'oauth_app_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '47ec6c8580164637ac508a8506f89753'
                        key: {
                            name: 'u_peer_review'
                            element: 'requester'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4a1a1a7e47398310b1197bb4416d431e'
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_input_311ad67e47398310b1197bb4416d43f9'
                            element: 'last_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4c996c6aa7ef4876b0a92df0b732198f'
                        key: {
                            name: 'u_peer_review'
                            element: 'update_set_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4d80550533ca4f4c898f180fb69fdc4b'
                        key: {
                            name: 'u_peer_review'
                            element: 'priority'
                            value: 'high'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '4e1a1a7e47398310b1197bb4416d4322'
                        deleted: true
                        key: {
                            model: '311ad67e47398310b1197bb4416d43f9'
                            element: 'email'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4e1a1a7e47398310b1197bb4416d4334'
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_input_311ad67e47398310b1197bb4416d43f9'
                            element: 'oauth_app_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '50420ced51f64d689b2f187cf0eafc21'
                        key: {
                            name: 'u_peer_review'
                            element: 'review_comments'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '50eacc044706cb10b1197bb4416d437e'
                        deleted: false
                        key: {
                            name: 'var__m_sys_hub_flow_input_54eacc044706cb10b1197bb4416d436f'
                            element: 'current'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '53da4c044706cb10b1197bb4416d436c'
                        deleted: false
                        key: {
                            model: '5fda4c044706cb10b1197bb4416d4303'
                            element: 'success'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5956bac4902c47b0b57430ca4f359c1d'
                        key: {
                            name: 'u_peer_review'
                            element: 'priority'
                            value: 'low'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '5b9ad6c9c9294cef8bf839f685caf596'
                        key: {
                            name: 'purple_pack'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5bda4c044706cb10b1197bb4416d4341'
                        deleted: false
                        key: {
                            name: 'var__m_sys_hub_flow_input_5fda4c044706cb10b1197bb4416d4303'
                            element: 'last_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5bda4c044706cb10b1197bb4416d4358'
                        deleted: false
                        key: {
                            name: 'var__m_sys_hub_flow_input_5fda4c044706cb10b1197bb4416d4303'
                            element: 'email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '5cd6e12d71e2404e918441c33946af8e'
                        key: {
                            name: 'global/main'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5e48ef02ebcf404e9d871d9a33fef1d9'
                        key: {
                            name: 'u_peer_review'
                            element: 'requested_on'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '5e9650a712d34217a85cfe040a84e4f2'
                        key: {
                            name: 'global/scan_and_deploy_main'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5fda4c044706cb10b1197bb4416d432a'
                        deleted: false
                        key: {
                            name: 'var__m_sys_hub_flow_input_5fda4c044706cb10b1197bb4416d4303'
                            element: 'username'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '621a5a7e47398310b1197bb4416d4355'
                        deleted: false
                        key: {
                            name: 'var__m_sys_hub_flow_input_c5a20f8a14654ff5ad64263b7dc05446'
                            element: 'table_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '66365a50b4b445f49d00f014f04ff499'
                        key: {
                            application_file: '1c9d8330e10e4d8aa3a9e165d3c17924'
                            source_artifact: 'a66541a70ac54695a84bfcc46203041d'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '69a10403f131404f9410ae20298a6794'
                        key: {
                            name: 'u_peer_review'
                            element: 'priority'
                            value: 'normal'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '69b67c2561c04c3aa85599223f413886'
                        deleted: true
                        key: {
                            model: '311ad67e47398310b1197bb4416d43f9'
                            element: 'manager'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6b0f616cdcd64acea84f2eb69289f813'
                        key: {
                            name: 'u_peer_review'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '6bda4c044706cb10b1197bb4416d4378'
                        deleted: false
                        key: {
                            model: '5fda4c044706cb10b1197bb4416d4303'
                            element: 'service_account_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6d8c370cf209430f9d0d3469169f0bd4'
                        key: {
                            name: 'u_peer_review'
                            element: 'reviewer'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '70d9cc61cac14e4fb547afa907d08514'
                        key: {
                            name: 'purple_pack.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '751ad67e47398310b1197bb4416d43fd'
                        deleted: true
                        key: {
                            model: '311ad67e47398310b1197bb4416d43f9'
                            element: 'username'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '761a5a7e47398310b1197bb4416d43e1'
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_input_2e1a5a7e47398310b1197bb4416d43c7'
                            element: 'table_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '764647140aaf419e9135a8795ce3333c'
                        key: {
                            model: '583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'success'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '789cc84f968a4b2aa25a0f794bffe84d'
                        key: {
                            cat_item: '519f41f556654a2ca87fbf08064a02ba'
                            variable_set: 'NULL'
                            name: 'calls_per_hour'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '791a1a7e47398310b1197bb4416d4308'
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_input_311ad67e47398310b1197bb4416d43f9'
                            element: 'username'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '7d1a1a7e47398310b1197bb4416d430c'
                        deleted: true
                        key: {
                            model: '311ad67e47398310b1197bb4416d43f9'
                            element: 'first_name'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7fc7f58d76244e308e30242e6b5536e2'
                        key: {
                            name: 'u_peer_review'
                            element: 'status'
                            value: 'in_review'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '821a1a7e47398310b1197bb4416d435c'
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_output_311ad67e47398310b1197bb4416d43f9'
                            element: 'success'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '821a1a7e47398310b1197bb4416d4372'
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_output_311ad67e47398310b1197bb4416d43f9'
                            element: 'oauth_app_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8550c16c5c1e4232af24ee1d9ea656a7'
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_input_311ad67e47398310b1197bb4416d43f9'
                            element: 'integration_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '861a1a7e47398310b1197bb4416d4360'
                        deleted: true
                        key: {
                            model: '311ad67e47398310b1197bb4416d43f9'
                            element: 'service_account_id'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '86a683f08e454e35a47cb09cfe82974e'
                        key: {
                            name: 'u_peer_review'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '86d36b1ed1184138926308865989f2f4'
                        key: {
                            name: 'u_peer_review'
                            element: 'update_set_id'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '8831b2a12cb848979966c3cfb8febc6b'
                        key: {
                            category: 'u_peer_review'
                            prefix: 'PR'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8a31a97b83e040e68ddc705f94ff3a4d'
                        key: {
                            name: 'u_peer_review'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8dff5ced861c4d5f873bb0c22d249524'
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_input_311ad67e47398310b1197bb4416d43f9'
                            element: 'manager'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '9024467d92bd416ea3318948197f5eb5'
                        key: {
                            application_file: '5b9ad6c9c9294cef8bf839f685caf596'
                            source_artifact: '70d9cc61cac14e4fb547afa907d08514'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '93ae2d1fa1894ef18fb29cb88a6be0e0'
                        key: {
                            name: 'u_peer_review'
                            element: 'reviewer'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '93da4c044706cb10b1197bb4416d4336'
                        deleted: false
                        key: {
                            name: 'var__m_sys_hub_flow_input_5fda4c044706cb10b1197bb4416d4303'
                            element: 'first_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '93da4c044706cb10b1197bb4416d4364'
                        deleted: false
                        key: {
                            name: 'var__m_sys_hub_flow_input_5fda4c044706cb10b1197bb4416d4303'
                            element: 'redirect_url'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '94eacc044706cb10b1197bb4416d4389'
                        deleted: false
                        key: {
                            name: 'var__m_sys_hub_flow_input_54eacc044706cb10b1197bb4416d436f'
                            element: 'table_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '94ff449574d44c2d8a704861d970ea55'
                        key: {
                            name: 'u_peer_review'
                            element: 'reviewed_on'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '956e3df93a3f44ddab4140cbaa1f45b6'
                        key: {
                            name: 'u_peer_review'
                            element: 'status'
                            value: 'approved'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '95dd8a1cca904b0fb20235c515ad0718'
                        key: {
                            name: 'var__m_sys_hub_flow_input_583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'username'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '97da4c044706cb10b1197bb4416d4351'
                        deleted: false
                        key: {
                            model: '5fda4c044706cb10b1197bb4416d4303'
                            element: 'email'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '98eacc044706cb10b1197bb4416d4371'
                        deleted: false
                        key: {
                            model: '54eacc044706cb10b1197bb4416d436f'
                            element: 'current'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9d66a1b546e2446f9a26d0aa5e9e8b78'
                        key: {
                            name: 'u_peer_review'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '9df189618846432882f8ac99e6bf9e4a'
                        key: {
                            application_file: 'f53b81d9d0f24305b14d83e8932f1289'
                            source_artifact: 'a66541a70ac54695a84bfcc46203041d'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9f833b262563402b93fe4e36bd3a642f'
                        key: {
                            name: 'u_peer_review'
                            element: 'status'
                            value: 'pending'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a3d2ecfad98e4fd0ba5f132c2a62fd41'
                        key: {
                            name: 'u_peer_review'
                            element: 'requested_on'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'a4a47aaa473d0310b1197bb4416d4343'
                        key: {
                            name: 'u_peer_review'
                            caption: 'NULL'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: 'a66541a70ac54695a84bfcc46203041d'
                        key: {
                            name: 'scan_and_deploy.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a98ea8e5b8624ca3b3b2d74023af14c5'
                        key: {
                            name: 'var__m_sys_hub_flow_output_583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'success'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'afda4c044706cb10b1197bb4416d4383'
                        deleted: false
                        key: {
                            model: '5fda4c044706cb10b1197bb4416d4303'
                            element: 'oauth_app_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'afda4c044706cb10b1197bb4416d438a'
                        deleted: false
                        key: {
                            name: 'var__m_sys_hub_flow_output_5fda4c044706cb10b1197bb4416d4303'
                            element: 'oauth_app_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b28a30614e804837b5fab223a1baa1f9'
                        key: {
                            name: 'var__m_sys_hub_flow_input_583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'oauth_app_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'b7c45bc0a3da41c1b8dd43fb3f8d2ca2'
                        key: {
                            name: 'u_peer_review'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'b873f0c5c1ff4b5f8361f268cb61327a'
                        deleted: true
                        key: {
                            model: '583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'integration_name'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b887531b5e124e9dbca7da9385dd925c'
                        key: {
                            name: 'u_peer_review'
                            element: 'status'
                            value: 'changes_requested'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'b9968ca3808c45a68ed8ee4336ffbdce'
                        deleted: false
                        key: {
                            model: '583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'redirect_url'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'c33bea89e2b94ae9ab4ad294bce1eaa5'
                        key: {
                            model: '583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'service_account_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c4fe1a7015d84fa2b7f722411c69a9f8'
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_input_583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'manager'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c61a1a7e47398310b1197bb4416d434c'
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_input_311ad67e47398310b1197bb4416d43f9'
                            element: 'redirect_url'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c7cbf525f7b84f6f9eca3d446f3efed3'
                        key: {
                            name: 'u_peer_review'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c81c6b96b9074f00bb1d41f63a0bfa21'
                        key: {
                            name: 'u_peer_review'
                            element: 'priority'
                            value: 'critical'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ca1a1a7e47398310b1197bb4416d4329'
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_input_311ad67e47398310b1197bb4416d43f9'
                            element: 'email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ca8bcc43c3984adb9f88f504325469d6'
                        key: {
                            name: 'u_peer_review'
                            element: 'requester'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cbaf60b5406e408f8883f11008849878'
                        key: {
                            name: 'u_peer_review'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'cc4a2f0e8963468589514f0b00aceb23'
                        deleted: true
                        key: {
                            model: '311ad67e47398310b1197bb4416d43f9'
                            element: 'integration_name'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'ccc298a1e9934a2ab48746bef8c920bf'
                        key: {
                            application_file: '5cd6e12d71e2404e918441c33946af8e'
                            source_artifact: '70d9cc61cac14e4fb547afa907d08514'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'ce1a1a7e47398310b1197bb4416d432d'
                        deleted: true
                        key: {
                            model: '311ad67e47398310b1197bb4416d43f9'
                            element: 'oauth_app_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd0e7825a8fec498096fe6f21bd7c22dc'
                        key: {
                            name: 'var__m_sys_hub_flow_output_583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'service_account_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'd21a5a7e47398310b1197bb4416d4309'
                        deleted: false
                        key: {
                            model: 'c5a20f8a14654ff5ad64263b7dc05446'
                            element: 'current'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'd33a0697b817476bbd2d889a5af05870'
                        key: {
                            model: '583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'oauth_app_id'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'd3da4c044706cb10b1197bb4416d432f'
                        deleted: false
                        key: {
                            model: '5fda4c044706cb10b1197bb4416d4303'
                            element: 'first_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd3da4c044706cb10b1197bb4416d4374'
                        deleted: false
                        key: {
                            name: 'var__m_sys_hub_flow_output_5fda4c044706cb10b1197bb4416d4303'
                            element: 'success'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'd4eacc044706cb10b1197bb4416d4382'
                        deleted: false
                        key: {
                            model: '54eacc044706cb10b1197bb4416d436f'
                            element: 'table_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd898be3a9e7d4ea799f4e390aa250204'
                        key: {
                            name: 'u_peer_review'
                            element: 'update_set_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'da1a5a7e47398310b1197bb4416d4324'
                        deleted: false
                        key: {
                            name: 'var__m_sys_hub_flow_input_c5a20f8a14654ff5ad64263b7dc05446'
                            element: 'current'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'dbda4c044706cb10b1197bb4416d4313'
                        deleted: false
                        key: {
                            model: '5fda4c044706cb10b1197bb4416d4303'
                            element: 'username'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'de1a5a7e47398310b1197bb4416d4328'
                        deleted: false
                        key: {
                            model: 'c5a20f8a14654ff5ad64263b7dc05446'
                            element: 'table_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'df991fbb3045462a9407a1cece25e7ac'
                        key: {
                            name: 'var__m_sys_hub_flow_input_583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'last_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'dfda4c044706cb10b1197bb4416d4345'
                        deleted: false
                        key: {
                            model: '5fda4c044706cb10b1197bb4416d4303'
                            element: 'oauth_app_name'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'dfda4c044706cb10b1197bb4416d435c'
                        deleted: false
                        key: {
                            model: '5fda4c044706cb10b1197bb4416d4303'
                            element: 'redirect_url'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'dfe5733ed4224be0b89516c0bf6ac265'
                        key: {
                            model: '583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'last_name'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'e76699601b384d8db75ae3fa2b38d743'
                        key: {
                            cat_item: '519f41f556654a2ca87fbf08064a02ba'
                            variable_set: 'NULL'
                            name: 'integration_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e91d3b85a16841e6b392c63ac496e882'
                        key: {
                            name: 'u_peer_review'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ececda54240c493bb36f18a73049b9cd'
                        deleted: false
                        key: {
                            name: 'var__m_sys_hub_flow_input_583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'redirect_url'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'ee1a5a7e47398310b1197bb4416d43c9'
                        deleted: true
                        key: {
                            model: '2e1a5a7e47398310b1197bb4416d43c7'
                            element: 'current'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'f53b81d9d0f24305b14d83e8932f1289'
                        key: {
                            name: 'scan_and_deploy'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f969c54e27504b09937c9bbdfec9750c'
                        key: {
                            name: 'u_peer_review'
                            element: 'reviewed_on'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'fd88d46841684be8917b17350d41306b'
                        key: {
                            name: 'global/main.js.map'
                        }
                    },
                ]
            }
        }
    }
}
