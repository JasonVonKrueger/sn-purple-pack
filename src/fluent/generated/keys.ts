import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    '2e1a5a7e47398310b1197bb4416d43c7': {
                        table: 'sys_hub_flow_snapshot'
                        id: '2e1a5a7e47398310b1197bb4416d43c7'
                    }
                    '311ad67e47398310b1197bb4416d43f9': {
                        table: 'sys_hub_flow_snapshot'
                        id: '311ad67e47398310b1197bb4416d43f9'
                    }
                    assign_integration_outputs: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '27ade3a86ca44f23820c245dc3861bdf'
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
                    log_success: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'b451e12c53934f08883e3e4ed416438a'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '531f53a3d5ea4e8b81b3490179a9fcad'
                    }
                    pp_create_integration_subflow: {
                        table: 'sys_hub_flow'
                        id: '583df9f6e6af4b54ac3f430b361ae4b1'
                    }
                    purple_pack_flow: {
                        table: 'sys_hub_flow'
                        id: 'c5a20f8a14654ff5ad64263b7dc05446'
                    }
                    trg_service_account_created: {
                        table: 'sys_hub_trigger_instance_v2'
                        id: '38acf7f34bf641dc9257e833bafa334d'
                    }
                }
                composite: [
                    {
                        table: 'sys_hub_flow_output'
                        id: '061a1a7e47398310b1197bb4416d4354'
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
                        table: 'sys_db_object'
                        id: '319cfbff282046efaa381d790213c1a6'
                        key: {
                            name: 'u_peer_review'
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
                        key: {
                            name: 'var__m_sys_hub_flow_input_583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '391a1a7e47398310b1197bb4416d4313'
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
                        key: {
                            model: '311ad67e47398310b1197bb4416d43f9'
                            element: 'last_name'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '421a1a7e47398310b1197bb4416d4339'
                        key: {
                            model: '311ad67e47398310b1197bb4416d43f9'
                            element: 'redirect_url'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '421a1a7e47398310b1197bb4416d4367'
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
                        key: {
                            model: '311ad67e47398310b1197bb4416d43f9'
                            element: 'email'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4e1a1a7e47398310b1197bb4416d4334'
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
                        table: 'sys_documentation'
                        id: '621a5a7e47398310b1197bb4416d4355'
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_input_c5a20f8a14654ff5ad64263b7dc05446'
                            element: 'table_name'
                            language: 'en'
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
                        table: 'sys_dictionary'
                        id: '6b0f616cdcd64acea84f2eb69289f813'
                        key: {
                            name: 'u_peer_review'
                            element: 'priority'
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
                        table: 'sys_documentation'
                        id: '791a1a7e47398310b1197bb4416d4308'
                        key: {
                            name: 'var__m_sys_hub_flow_input_311ad67e47398310b1197bb4416d43f9'
                            element: 'username'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '7d1a1a7e47398310b1197bb4416d430c'
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
                        key: {
                            name: 'var__m_sys_hub_flow_output_311ad67e47398310b1197bb4416d43f9'
                            element: 'success'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '821a1a7e47398310b1197bb4416d4372'
                        key: {
                            name: 'var__m_sys_hub_flow_output_311ad67e47398310b1197bb4416d43f9'
                            element: 'oauth_app_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '861a1a7e47398310b1197bb4416d4360'
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
                        table: 'sys_documentation'
                        id: '9d66a1b546e2446f9a26d0aa5e9e8b78'
                        key: {
                            name: 'u_peer_review'
                            element: 'notes'
                            language: 'en'
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
                        table: 'sys_documentation'
                        id: 'a98ea8e5b8624ca3b3b2d74023af14c5'
                        key: {
                            name: 'var__m_sys_hub_flow_output_583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'success'
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
                        id: 'c61a1a7e47398310b1197bb4416d434c'
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
                        deleted: true
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
                        deleted: true
                        key: {
                            name: 'var__m_sys_hub_flow_input_c5a20f8a14654ff5ad64263b7dc05446'
                            element: 'current'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'de1a5a7e47398310b1197bb4416d4328'
                        deleted: true
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
                        id: 'dfe5733ed4224be0b89516c0bf6ac265'
                        key: {
                            model: '583df9f6e6af4b54ac3f430b361ae4b1'
                            element: 'last_name'
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
