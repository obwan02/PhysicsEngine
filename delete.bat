del /q "node_modules\\*"
FOR /D %%p IN ("node_modules\\*.*") DO rmdir "%%p" /s /q