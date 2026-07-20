update system_settings
set value = replace(replace(value, 'market@caniuav.com', 'so_0307@qq.com'), 'support@caniuav.com', 'so_0307@qq.com')
where key = 'source_translations_zh';

update system_settings
set value = replace(value, 'info@caniuav.com', 'so_0307@qq.com')
where key = 'source_translations_zh';

update system_settings
set value = replace(value, 'feedback@caniuav.com', 'so_0307@qq.com')
where key = 'source_translations_zh';

update system_settings
set value = replace(value, 'sales@caniuav.com', 'so_0307@qq.com')
where key = 'source_translations_zh';

update system_settings
set value = replace(value, 'admin@caniuav.com', 'so_0307@qq.com')
where key = 'source_translations_zh';