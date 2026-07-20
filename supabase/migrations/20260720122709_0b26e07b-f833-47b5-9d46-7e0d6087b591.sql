update system_settings
set value = regexp_replace(
              regexp_replace(
                regexp_replace(
                  regexp_replace(value,
                    '([^0-9]|^)(\\+86-?)?181-?6368-?5410([^0-9]|$)', '\1+8613574137503\3', 'g'
                  ),
                  '([^0-9]|^)(\\+86-?)?135-?7413-?7503([^0-9]|$)', '\1+8613574137503\3', 'g'
                ),
                '([^0-9]|^)(\\+86-?)?176-?7404-?8404([^0-9]|$)', '\1+8613574137503\3', 'g'
              ),
              '([^0-9]|^)(\\+86-?)?1767-?404-?8404([^0-9]|$)', '\1+8613574137503\3', 'g'
            )
where key like 'translations_%' or key like 'source_translations_%';