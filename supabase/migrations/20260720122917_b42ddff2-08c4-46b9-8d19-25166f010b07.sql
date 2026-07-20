update system_settings
set value = replace(value, '+86+8613574137503', '+8613574137503')
where (key like 'translations_%' or key like 'source_translations_%')
  and value::text like '%+86+8613574137503%';