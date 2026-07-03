import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '12aab1ab858c4a1b9d2d6bb584440813'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '531f53a3d5ea4e8b81b3490179a9fcad'
                    }
                }
                composite: [
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
                        id: '184f672ad69247799d6d0902f3d47352'
                        key: {
                            name: 'u_peer_review'
                            element: 'update_set_name'
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
                        table: 'sys_db_object'
                        id: '319cfbff282046efaa381d790213c1a6'
                        key: {
                            name: 'u_peer_review'
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
                        table: 'sys_dictionary'
                        id: '4529a0623b1d488ba739123b6952e2e2'
                        key: {
                            name: 'u_peer_review'
                            element: 'notes'
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
                        table: 'sys_choice'
                        id: '7fc7f58d76244e308e30242e6b5536e2'
                        key: {
                            name: 'u_peer_review'
                            element: 'status'
                            value: 'in_review'
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
                        table: 'sys_dictionary'
                        id: 'd898be3a9e7d4ea799f4e390aa250204'
                        key: {
                            name: 'u_peer_review'
                            element: 'update_set_name'
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
