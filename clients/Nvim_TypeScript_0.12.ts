import { RPCMessagePackConnection as RPC } from "@src/rpc";
import { type NVIM_BUFFER_EXT_RETURN, type NVIM_WINDOW_EXT_RETURN, type NVIM_TABPAGE_EXT_RETURN } from "@src/nvim_types";
export class NvimClient {
    constructor(private rpc: RPC, private msgid = 0) { }
    async nvim_get_autocmds(opts: object): Promise<any[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_autocmds", params: [opts] })).result;
    }
    async nvim_create_autocmd(event: object, opts: object): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_create_autocmd", params: [event, opts] })).result;
    }
    async nvim_del_autocmd(id: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_del_autocmd", params: [id] })).result;
    }
    async nvim_clear_autocmds(opts: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_clear_autocmds", params: [opts] })).result;
    }
    async nvim_create_augroup(name: string, opts: object): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_create_augroup", params: [name, opts] })).result;
    }
    async nvim_del_augroup_by_id(id: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_del_augroup_by_id", params: [id] })).result;
    }
    async nvim_del_augroup_by_name(name: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_del_augroup_by_name", params: [name] })).result;
    }
    async nvim_exec_autocmds(event: object, opts: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_exec_autocmds", params: [event, opts] })).result;
    }
    async nvim_buf_line_count(buffer: number): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_line_count", params: [buffer] })).result;
    }
    async nvim_buf_attach(buffer: number, send_buffer: boolean, opts: object): Promise<boolean> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_attach", params: [buffer, send_buffer, opts] })).result;
    }
    async nvim_buf_detach(buffer: number): Promise<boolean> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_detach", params: [buffer] })).result;
    }
    async nvim_buf_get_lines(buffer: number, start: number, end: number, strict_indexing: boolean): Promise<string[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_get_lines", params: [buffer, start, end, strict_indexing] })).result;
    }
    async nvim_buf_set_lines(buffer: number, start: number, end: number, strict_indexing: boolean, replacement: string[]): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_set_lines", params: [buffer, start, end, strict_indexing, replacement] })).result;
    }
    async nvim_buf_set_text(buffer: number, start_row: number, start_col: number, end_row: number, end_col: number, replacement: string[]): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_set_text", params: [buffer, start_row, start_col, end_row, end_col, replacement] })).result;
    }
    async nvim_buf_get_text(buffer: number, start_row: number, start_col: number, end_row: number, end_col: number, opts: object): Promise<string[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_get_text", params: [buffer, start_row, start_col, end_row, end_col, opts] })).result;
    }
    async nvim_buf_get_offset(buffer: number, index: number): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_get_offset", params: [buffer, index] })).result;
    }
    async nvim_buf_get_var(buffer: number, name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_get_var", params: [buffer, name] })).result;
    }
    async nvim_buf_get_changedtick(buffer: number): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_get_changedtick", params: [buffer] })).result;
    }
    async nvim_buf_get_keymap(buffer: number, mode: string): Promise<object[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_get_keymap", params: [buffer, mode] })).result;
    }
    async nvim_buf_set_keymap(buffer: number, mode: string, lhs: string, rhs: string, opts: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_set_keymap", params: [buffer, mode, lhs, rhs, opts] })).result;
    }
    async nvim_buf_del_keymap(buffer: number, mode: string, lhs: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_del_keymap", params: [buffer, mode, lhs] })).result;
    }
    async nvim_buf_set_var(buffer: number, name: string, value: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_set_var", params: [buffer, name, value] })).result;
    }
    async nvim_buf_del_var(buffer: number, name: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_del_var", params: [buffer, name] })).result;
    }
    async nvim_buf_get_name(buffer: number): Promise<string> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_get_name", params: [buffer] })).result;
    }
    async nvim_buf_set_name(buffer: number, name: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_set_name", params: [buffer, name] })).result;
    }
    async nvim_buf_is_loaded(buffer: number): Promise<boolean> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_is_loaded", params: [buffer] })).result;
    }
    async nvim_buf_delete(buffer: number, opts: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_delete", params: [buffer, opts] })).result;
    }
    async nvim_buf_is_valid(buffer: number): Promise<boolean> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_is_valid", params: [buffer] })).result;
    }
    async nvim_buf_del_mark(buffer: number, name: string): Promise<boolean> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_del_mark", params: [buffer, name] })).result;
    }
    async nvim_buf_set_mark(buffer: number, name: string, line: number, col: number, opts: object): Promise<boolean> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_set_mark", params: [buffer, name, line, col, opts] })).result;
    }
    async nvim_buf_get_mark(buffer: number, name: string): Promise<number[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_get_mark", params: [buffer, name] })).result;
    }
    async nvim_parse_cmd(str: string, opts: object): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_parse_cmd", params: [str, opts] })).result;
    }
    async nvim_cmd(cmd: object, opts: object): Promise<string> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_cmd", params: [cmd, opts] })).result;
    }
    async nvim_create_user_command(name: string, command: object, opts: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_create_user_command", params: [name, command, opts] })).result;
    }
    async nvim_del_user_command(name: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_del_user_command", params: [name] })).result;
    }
    async nvim_buf_create_user_command(buffer: number, name: string, command: object, opts: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_create_user_command", params: [buffer, name, command, opts] })).result;
    }
    async nvim_buf_del_user_command(buffer: number, name: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_del_user_command", params: [buffer, name] })).result;
    }
    async nvim_get_commands(opts: object): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_commands", params: [opts] })).result;
    }
    async nvim_buf_get_commands(buffer: number, opts: object): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_get_commands", params: [buffer, opts] })).result;
    }
    async nvim_exec(src: string, output: boolean): Promise<string> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_exec", params: [src, output] })).result;
    }
    async nvim_command_output(command: string): Promise<string> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_command_output", params: [command] })).result;
    }
    async nvim_execute_lua(code: string, args: any[]): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_execute_lua", params: [code, args] })).result;
    }
    async nvim_buf_get_number(buffer: number): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_get_number", params: [buffer] })).result;
    }
    async nvim_buf_clear_highlight(buffer: number, ns_id: number, line_start: number, line_end: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_clear_highlight", params: [buffer, ns_id, line_start, line_end] })).result;
    }
    async nvim_buf_add_highlight(buffer: number, ns_id: number, hl_group: string, line: number, col_start: number, col_end: number): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_add_highlight", params: [buffer, ns_id, hl_group, line, col_start, col_end] })).result;
    }
    async nvim_buf_set_virtual_text(buffer: number, src_id: number, line: number, chunks: any[], opts: object): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_set_virtual_text", params: [buffer, src_id, line, chunks, opts] })).result;
    }
    async nvim_get_hl_by_id(hl_id: number, rgb: boolean): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_hl_by_id", params: [hl_id, rgb] })).result;
    }
    async nvim_get_hl_by_name(name: string, rgb: boolean): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_hl_by_name", params: [name, rgb] })).result;
    }
    async buffer_insert(buffer: number, lnum: number, lines: string[]): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_insert", params: [buffer, lnum, lines] })).result;
    }
    async buffer_get_line(buffer: number, index: number): Promise<string> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_get_line", params: [buffer, index] })).result;
    }
    async buffer_set_line(buffer: number, index: number, line: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_set_line", params: [buffer, index, line] })).result;
    }
    async buffer_del_line(buffer: number, index: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_del_line", params: [buffer, index] })).result;
    }
    async buffer_get_line_slice(buffer: number, start: number, end: number, include_start: boolean, include_end: boolean): Promise<string[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_get_line_slice", params: [buffer, start, end, include_start, include_end] })).result;
    }
    async buffer_set_line_slice(buffer: number, start: number, end: number, include_start: boolean, include_end: boolean, replacement: string[]): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_set_line_slice", params: [buffer, start, end, include_start, include_end, replacement] })).result;
    }
    async buffer_set_var(buffer: number, name: string, value: object): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_set_var", params: [buffer, name, value] })).result;
    }
    async buffer_del_var(buffer: number, name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_del_var", params: [buffer, name] })).result;
    }
    async window_set_var(window: number, name: string, value: object): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "window_set_var", params: [window, name, value] })).result;
    }
    async window_del_var(window: number, name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "window_del_var", params: [window, name] })).result;
    }
    async tabpage_set_var(tabpage: number, name: string, value: object): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "tabpage_set_var", params: [tabpage, name, value] })).result;
    }
    async tabpage_del_var(tabpage: number, name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "tabpage_del_var", params: [tabpage, name] })).result;
    }
    async vim_set_var(name: string, value: object): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_set_var", params: [name, value] })).result;
    }
    async vim_del_var(name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_del_var", params: [name] })).result;
    }
    async nvim_get_option_info(name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_option_info", params: [name] })).result;
    }
    async nvim_set_option(name: string, value: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_set_option", params: [name, value] })).result;
    }
    async nvim_get_option(name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_option", params: [name] })).result;
    }
    async nvim_buf_get_option(buffer: number, name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_get_option", params: [buffer, name] })).result;
    }
    async nvim_buf_set_option(buffer: number, name: string, value: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_set_option", params: [buffer, name, value] })).result;
    }
    async nvim_win_get_option(window: number, name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_get_option", params: [window, name] })).result;
    }
    async nvim_win_set_option(window: number, name: string, value: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_set_option", params: [window, name, value] })).result;
    }
    async nvim_call_atomic(calls: any[]): Promise<any[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_call_atomic", params: [calls] })).result;
    }
    async nvim_subscribe(event: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_subscribe", params: [event] })).result;
    }
    async nvim_unsubscribe(event: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_unsubscribe", params: [event] })).result;
    }
    async nvim_out_write(str: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_out_write", params: [str] })).result;
    }
    async nvim_err_write(str: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_err_write", params: [str] })).result;
    }
    async nvim_err_writeln(str: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_err_writeln", params: [str] })).result;
    }
    async nvim_notify(msg: string, log_level: number, opts: object): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_notify", params: [msg, log_level, opts] })).result;
    }
    async nvim_create_namespace(name: string): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_create_namespace", params: [name] })).result;
    }
    async nvim_get_namespaces(): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_namespaces", params: [] })).result;
    }
    async nvim_buf_get_extmark_by_id(buffer: number, ns_id: number, id: number, opts: object): Promise<number[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_get_extmark_by_id", params: [buffer, ns_id, id, opts] })).result;
    }
    async nvim_buf_get_extmarks(buffer: number, ns_id: number, start: object, end: object, opts: object): Promise<any[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_get_extmarks", params: [buffer, ns_id, start, end, opts] })).result;
    }
    async nvim_buf_set_extmark(buffer: number, ns_id: number, line: number, col: number, opts: object): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_set_extmark", params: [buffer, ns_id, line, col, opts] })).result;
    }
    async nvim_buf_del_extmark(buffer: number, ns_id: number, id: number): Promise<boolean> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_del_extmark", params: [buffer, ns_id, id] })).result;
    }
    async nvim_buf_clear_namespace(buffer: number, ns_id: number, line_start: number, line_end: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_buf_clear_namespace", params: [buffer, ns_id, line_start, line_end] })).result;
    }
    async nvim_set_decoration_provider(ns_id: number, opts: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_set_decoration_provider", params: [ns_id, opts] })).result;
    }
    async nvim_get_option_value(name: string, opts: object): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_option_value", params: [name, opts] })).result;
    }
    async nvim_set_option_value(name: string, value: object, opts: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_set_option_value", params: [name, value, opts] })).result;
    }
    async nvim_get_all_options_info(): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_all_options_info", params: [] })).result;
    }
    async nvim_get_option_info2(name: string, opts: object): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_option_info2", params: [name, opts] })).result;
    }
    async nvim_tabpage_list_wins(tabpage: number): Promise<NVIM_WINDOW_EXT_RETURN[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_tabpage_list_wins", params: [tabpage] })).result;
    }
    async nvim_tabpage_get_var(tabpage: number, name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_tabpage_get_var", params: [tabpage, name] })).result;
    }
    async nvim_tabpage_set_var(tabpage: number, name: string, value: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_tabpage_set_var", params: [tabpage, name, value] })).result;
    }
    async nvim_tabpage_del_var(tabpage: number, name: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_tabpage_del_var", params: [tabpage, name] })).result;
    }
    async nvim_tabpage_get_win(tabpage: number): Promise<NVIM_WINDOW_EXT_RETURN> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_tabpage_get_win", params: [tabpage] })).result;
    }
    async nvim_tabpage_set_win(tabpage: number, win: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_tabpage_set_win", params: [tabpage, win] })).result;
    }
    async nvim_tabpage_get_number(tabpage: number): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_tabpage_get_number", params: [tabpage] })).result;
    }
    async nvim_tabpage_is_valid(tabpage: number): Promise<boolean> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_tabpage_is_valid", params: [tabpage] })).result;
    }
    async nvim_ui_attach(width: number, height: number, options: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_ui_attach", params: [width, height, options] })).result;
    }
    async ui_attach(width: number, height: number, enable_rgb: boolean): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "ui_attach", params: [width, height, enable_rgb] })).result;
    }
    async nvim_ui_set_focus(gained: boolean): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_ui_set_focus", params: [gained] })).result;
    }
    async nvim_ui_detach(): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_ui_detach", params: [] })).result;
    }
    async nvim_ui_try_resize(width: number, height: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_ui_try_resize", params: [width, height] })).result;
    }
    async nvim_ui_set_option(name: string, value: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_ui_set_option", params: [name, value] })).result;
    }
    async nvim_ui_try_resize_grid(grid: number, width: number, height: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_ui_try_resize_grid", params: [grid, width, height] })).result;
    }
    async nvim_ui_pum_set_height(height: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_ui_pum_set_height", params: [height] })).result;
    }
    async nvim_ui_pum_set_bounds(width: number, height: number, row: number, col: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_ui_pum_set_bounds", params: [width, height, row, col] })).result;
    }
    async nvim_ui_term_event(event: string, value: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_ui_term_event", params: [event, value] })).result;
    }
    async nvim_get_hl_id_by_name(name: string): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_hl_id_by_name", params: [name] })).result;
    }
    async nvim_get_hl(ns_id: number, opts: object): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_hl", params: [ns_id, opts] })).result;
    }
    async nvim_set_hl(ns_id: number, name: string, val: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_set_hl", params: [ns_id, name, val] })).result;
    }
    async nvim_get_hl_ns(opts: object): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_hl_ns", params: [opts] })).result;
    }
    async nvim_set_hl_ns(ns_id: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_set_hl_ns", params: [ns_id] })).result;
    }
    async nvim_set_hl_ns_fast(ns_id: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_set_hl_ns_fast", params: [ns_id] })).result;
    }
    async nvim_feedkeys(keys: string, mode: string, escape_ks: boolean): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_feedkeys", params: [keys, mode, escape_ks] })).result;
    }
    async nvim_input(keys: string): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_input", params: [keys] })).result;
    }
    async nvim_input_mouse(button: string, action: string, modifier: string, grid: number, row: number, col: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_input_mouse", params: [button, action, modifier, grid, row, col] })).result;
    }
    async nvim_replace_termcodes(str: string, from_part: boolean, do_lt: boolean, special: boolean): Promise<string> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_replace_termcodes", params: [str, from_part, do_lt, special] })).result;
    }
    async nvim_exec_lua(code: string, args: any[]): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_exec_lua", params: [code, args] })).result;
    }
    async nvim_strwidth(text: string): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_strwidth", params: [text] })).result;
    }
    async nvim_list_runtime_paths(): Promise<string[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_list_runtime_paths", params: [] })).result;
    }
    async nvim_get_runtime_file(name: string, all: boolean): Promise<string[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_runtime_file", params: [name, all] })).result;
    }
    async nvim_set_current_dir(dir: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_set_current_dir", params: [dir] })).result;
    }
    async nvim_get_current_line(): Promise<string> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_current_line", params: [] })).result;
    }
    async nvim_set_current_line(line: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_set_current_line", params: [line] })).result;
    }
    async nvim_del_current_line(): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_del_current_line", params: [] })).result;
    }
    async nvim_get_var(name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_var", params: [name] })).result;
    }
    async nvim_set_var(name: string, value: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_set_var", params: [name, value] })).result;
    }
    async nvim_del_var(name: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_del_var", params: [name] })).result;
    }
    async nvim_get_vvar(name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_vvar", params: [name] })).result;
    }
    async nvim_set_vvar(name: string, value: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_set_vvar", params: [name, value] })).result;
    }
    async nvim_echo(chunks: any[], history: boolean, opts: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_echo", params: [chunks, history, opts] })).result;
    }
    async nvim_list_bufs(): Promise<NVIM_BUFFER_EXT_RETURN[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_list_bufs", params: [] })).result;
    }
    async nvim_get_current_buf(): Promise<NVIM_BUFFER_EXT_RETURN> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_current_buf", params: [] })).result;
    }
    async nvim_set_current_buf(buffer: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_set_current_buf", params: [buffer] })).result;
    }
    async nvim_list_wins(): Promise<NVIM_WINDOW_EXT_RETURN[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_list_wins", params: [] })).result;
    }
    async nvim_get_current_win(): Promise<NVIM_WINDOW_EXT_RETURN> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_current_win", params: [] })).result;
    }
    async nvim_set_current_win(window: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_set_current_win", params: [window] })).result;
    }
    async nvim_create_buf(listed: boolean, scratch: boolean): Promise<NVIM_BUFFER_EXT_RETURN> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_create_buf", params: [listed, scratch] })).result;
    }
    async nvim_open_term(buffer: number, opts: object): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_open_term", params: [buffer, opts] })).result;
    }
    async nvim_chan_send(chan: number, data: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_chan_send", params: [chan, data] })).result;
    }
    async nvim_list_tabpages(): Promise<NVIM_TABPAGE_EXT_RETURN[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_list_tabpages", params: [] })).result;
    }
    async nvim_get_current_tabpage(): Promise<NVIM_TABPAGE_EXT_RETURN> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_current_tabpage", params: [] })).result;
    }
    async nvim_set_current_tabpage(tabpage: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_set_current_tabpage", params: [tabpage] })).result;
    }
    async nvim_paste(data: string, crlf: boolean, phase: number): Promise<boolean> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_paste", params: [data, crlf, phase] })).result;
    }
    async nvim_put(lines: string[], type: string, after: boolean, follow: boolean): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_put", params: [lines, type, after, follow] })).result;
    }
    async nvim_get_color_by_name(name: string): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_color_by_name", params: [name] })).result;
    }
    async nvim_get_color_map(): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_color_map", params: [] })).result;
    }
    async nvim_get_context(opts: object): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_context", params: [opts] })).result;
    }
    async nvim_load_context(dict: object): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_load_context", params: [dict] })).result;
    }
    async nvim_get_mode(): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_mode", params: [] })).result;
    }
    async nvim_get_keymap(mode: string): Promise<object[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_keymap", params: [mode] })).result;
    }
    async nvim_set_keymap(mode: string, lhs: string, rhs: string, opts: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_set_keymap", params: [mode, lhs, rhs, opts] })).result;
    }
    async nvim_del_keymap(mode: string, lhs: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_del_keymap", params: [mode, lhs] })).result;
    }
    async nvim_get_api_info(): Promise<any[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_api_info", params: [] })).result;
    }
    async nvim_set_client_info(name: string, version: object, type: string, methods: object, attributes: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_set_client_info", params: [name, version, type, methods, attributes] })).result;
    }
    async nvim_get_chan_info(chan: number): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_chan_info", params: [chan] })).result;
    }
    async nvim_list_chans(): Promise<any[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_list_chans", params: [] })).result;
    }
    async nvim_list_uis(): Promise<any[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_list_uis", params: [] })).result;
    }
    async nvim_get_proc_children(pid: number): Promise<any[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_proc_children", params: [pid] })).result;
    }
    async nvim_get_proc(pid: number): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_proc", params: [pid] })).result;
    }
    async nvim_select_popupmenu_item(item: number, insert: boolean, finish: boolean, opts: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_select_popupmenu_item", params: [item, insert, finish, opts] })).result;
    }
    async nvim_del_mark(name: string): Promise<boolean> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_del_mark", params: [name] })).result;
    }
    async nvim_get_mark(name: string, opts: object): Promise<any[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_get_mark", params: [name, opts] })).result;
    }
    async nvim_eval_statusline(str: string, opts: object): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_eval_statusline", params: [str, opts] })).result;
    }
    async nvim_exec2(src: string, opts: object): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_exec2", params: [src, opts] })).result;
    }
    async nvim_command(command: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_command", params: [command] })).result;
    }
    async nvim_eval(expr: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_eval", params: [expr] })).result;
    }
    async nvim_call_function(fn: string, args: any[]): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_call_function", params: [fn, args] })).result;
    }
    async nvim_call_dict_function(dict: object, fn: string, args: any[]): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_call_dict_function", params: [dict, fn, args] })).result;
    }
    async nvim_parse_expression(expr: string, flags: string, highlight: boolean): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_parse_expression", params: [expr, flags, highlight] })).result;
    }
    async nvim_open_win(buffer: number, enter: boolean, config: object): Promise<NVIM_WINDOW_EXT_RETURN> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_open_win", params: [buffer, enter, config] })).result;
    }
    async nvim_win_set_config(window: number, config: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_set_config", params: [window, config] })).result;
    }
    async nvim_win_get_config(window: number): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_get_config", params: [window] })).result;
    }
    async nvim_win_get_buf(window: number): Promise<NVIM_BUFFER_EXT_RETURN> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_get_buf", params: [window] })).result;
    }
    async nvim_win_set_buf(window: number, buffer: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_set_buf", params: [window, buffer] })).result;
    }
    async nvim_win_get_cursor(window: number): Promise<number[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_get_cursor", params: [window] })).result;
    }
    async nvim_win_set_cursor(window: number, pos: number[]): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_set_cursor", params: [window, pos] })).result;
    }
    async nvim_win_get_height(window: number): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_get_height", params: [window] })).result;
    }
    async nvim_win_set_height(window: number, height: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_set_height", params: [window, height] })).result;
    }
    async nvim_win_get_width(window: number): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_get_width", params: [window] })).result;
    }
    async nvim_win_set_width(window: number, width: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_set_width", params: [window, width] })).result;
    }
    async nvim_win_get_var(window: number, name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_get_var", params: [window, name] })).result;
    }
    async nvim_win_set_var(window: number, name: string, value: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_set_var", params: [window, name, value] })).result;
    }
    async nvim_win_del_var(window: number, name: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_del_var", params: [window, name] })).result;
    }
    async nvim_win_get_position(window: number): Promise<number[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_get_position", params: [window] })).result;
    }
    async nvim_win_get_tabpage(window: number): Promise<NVIM_TABPAGE_EXT_RETURN> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_get_tabpage", params: [window] })).result;
    }
    async nvim_win_get_number(window: number): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_get_number", params: [window] })).result;
    }
    async nvim_win_is_valid(window: number): Promise<boolean> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_is_valid", params: [window] })).result;
    }
    async nvim_win_hide(window: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_hide", params: [window] })).result;
    }
    async nvim_win_close(window: number, force: boolean): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_close", params: [window, force] })).result;
    }
    async nvim_win_set_hl_ns(window: number, ns_id: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_set_hl_ns", params: [window, ns_id] })).result;
    }
    async nvim_win_text_height(window: number, opts: object): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "nvim_win_text_height", params: [window, opts] })).result;
    }
    async buffer_line_count(buffer: number): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_line_count", params: [buffer] })).result;
    }
    async buffer_get_lines(buffer: number, start: number, end: number, strict_indexing: boolean): Promise<string[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_get_lines", params: [buffer, start, end, strict_indexing] })).result;
    }
    async buffer_set_lines(buffer: number, start: number, end: number, strict_indexing: boolean, replacement: string[]): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_set_lines", params: [buffer, start, end, strict_indexing, replacement] })).result;
    }
    async buffer_get_var(buffer: number, name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_get_var", params: [buffer, name] })).result;
    }
    async buffer_get_name(buffer: number): Promise<string> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_get_name", params: [buffer] })).result;
    }
    async buffer_set_name(buffer: number, name: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_set_name", params: [buffer, name] })).result;
    }
    async buffer_is_valid(buffer: number): Promise<boolean> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_is_valid", params: [buffer] })).result;
    }
    async buffer_get_mark(buffer: number, name: string): Promise<number[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_get_mark", params: [buffer, name] })).result;
    }
    async vim_command_output(command: string): Promise<string> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_command_output", params: [command] })).result;
    }
    async buffer_get_number(buffer: number): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_get_number", params: [buffer] })).result;
    }
    async buffer_clear_highlight(buffer: number, ns_id: number, line_start: number, line_end: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_clear_highlight", params: [buffer, ns_id, line_start, line_end] })).result;
    }
    async buffer_add_highlight(buffer: number, ns_id: number, hl_group: string, line: number, col_start: number, col_end: number): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_add_highlight", params: [buffer, ns_id, hl_group, line, col_start, col_end] })).result;
    }
    async vim_set_option(name: string, value: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_set_option", params: [name, value] })).result;
    }
    async vim_get_option(name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_get_option", params: [name] })).result;
    }
    async buffer_get_option(buffer: number, name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_get_option", params: [buffer, name] })).result;
    }
    async buffer_set_option(buffer: number, name: string, value: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "buffer_set_option", params: [buffer, name, value] })).result;
    }
    async window_get_option(window: number, name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "window_get_option", params: [window, name] })).result;
    }
    async window_set_option(window: number, name: string, value: object): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "window_set_option", params: [window, name, value] })).result;
    }
    async vim_subscribe(event: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_subscribe", params: [event] })).result;
    }
    async vim_unsubscribe(event: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_unsubscribe", params: [event] })).result;
    }
    async vim_out_write(str: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_out_write", params: [str] })).result;
    }
    async vim_err_write(str: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_err_write", params: [str] })).result;
    }
    async vim_report_error(str: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_report_error", params: [str] })).result;
    }
    async tabpage_get_windows(tabpage: number): Promise<NVIM_WINDOW_EXT_RETURN[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "tabpage_get_windows", params: [tabpage] })).result;
    }
    async tabpage_get_var(tabpage: number, name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "tabpage_get_var", params: [tabpage, name] })).result;
    }
    async tabpage_get_window(tabpage: number): Promise<NVIM_WINDOW_EXT_RETURN> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "tabpage_get_window", params: [tabpage] })).result;
    }
    async tabpage_is_valid(tabpage: number): Promise<boolean> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "tabpage_is_valid", params: [tabpage] })).result;
    }
    async ui_detach(): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "ui_detach", params: [] })).result;
    }
    async ui_try_resize(width: number, height: number): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "ui_try_resize", params: [width, height] })).result;
    }
    async vim_feedkeys(keys: string, mode: string, escape_ks: boolean): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_feedkeys", params: [keys, mode, escape_ks] })).result;
    }
    async vim_input(keys: string): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_input", params: [keys] })).result;
    }
    async vim_replace_termcodes(str: string, from_part: boolean, do_lt: boolean, special: boolean): Promise<string> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_replace_termcodes", params: [str, from_part, do_lt, special] })).result;
    }
    async vim_strwidth(text: string): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_strwidth", params: [text] })).result;
    }
    async vim_list_runtime_paths(): Promise<string[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_list_runtime_paths", params: [] })).result;
    }
    async vim_change_directory(dir: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_change_directory", params: [dir] })).result;
    }
    async vim_get_current_line(): Promise<string> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_get_current_line", params: [] })).result;
    }
    async vim_set_current_line(line: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_set_current_line", params: [line] })).result;
    }
    async vim_del_current_line(): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_del_current_line", params: [] })).result;
    }
    async vim_get_var(name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_get_var", params: [name] })).result;
    }
    async vim_get_vvar(name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_get_vvar", params: [name] })).result;
    }
    async vim_get_buffers(): Promise<NVIM_BUFFER_EXT_RETURN[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_get_buffers", params: [] })).result;
    }
    async vim_get_current_buffer(): Promise<NVIM_BUFFER_EXT_RETURN> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_get_current_buffer", params: [] })).result;
    }
    async vim_set_current_buffer(buffer: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_set_current_buffer", params: [buffer] })).result;
    }
    async vim_get_windows(): Promise<NVIM_WINDOW_EXT_RETURN[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_get_windows", params: [] })).result;
    }
    async vim_get_current_window(): Promise<NVIM_WINDOW_EXT_RETURN> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_get_current_window", params: [] })).result;
    }
    async vim_set_current_window(window: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_set_current_window", params: [window] })).result;
    }
    async vim_get_tabpages(): Promise<NVIM_TABPAGE_EXT_RETURN[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_get_tabpages", params: [] })).result;
    }
    async vim_get_current_tabpage(): Promise<NVIM_TABPAGE_EXT_RETURN> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_get_current_tabpage", params: [] })).result;
    }
    async vim_set_current_tabpage(tabpage: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_set_current_tabpage", params: [tabpage] })).result;
    }
    async vim_name_to_color(name: string): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_name_to_color", params: [name] })).result;
    }
    async vim_get_color_map(): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_get_color_map", params: [] })).result;
    }
    async vim_get_api_info(): Promise<any[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_get_api_info", params: [] })).result;
    }
    async vim_command(command: string): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_command", params: [command] })).result;
    }
    async vim_eval(expr: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_eval", params: [expr] })).result;
    }
    async vim_call_function(fn: string, args: any[]): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "vim_call_function", params: [fn, args] })).result;
    }
    async window_get_buffer(window: number): Promise<NVIM_BUFFER_EXT_RETURN> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "window_get_buffer", params: [window] })).result;
    }
    async window_get_cursor(window: number): Promise<number[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "window_get_cursor", params: [window] })).result;
    }
    async window_set_cursor(window: number, pos: number[]): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "window_set_cursor", params: [window, pos] })).result;
    }
    async window_get_height(window: number): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "window_get_height", params: [window] })).result;
    }
    async window_set_height(window: number, height: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "window_set_height", params: [window, height] })).result;
    }
    async window_get_width(window: number): Promise<number> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "window_get_width", params: [window] })).result;
    }
    async window_set_width(window: number, width: number): Promise<void> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "window_set_width", params: [window, width] })).result;
    }
    async window_get_var(window: number, name: string): Promise<object> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "window_get_var", params: [window, name] })).result;
    }
    async window_get_position(window: number): Promise<number[]> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "window_get_position", params: [window] })).result;
    }
    async window_get_tabpage(window: number): Promise<NVIM_TABPAGE_EXT_RETURN> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "window_get_tabpage", params: [window] })).result;
    }
    async window_is_valid(window: number): Promise<boolean> {
        return (await (this.rpc.RPC)({ type: 0, msgid: this.msgid++, method: "window_is_valid", params: [window] })).result;
    }
}
