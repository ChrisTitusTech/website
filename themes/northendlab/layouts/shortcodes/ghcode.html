{{ $file := .Get 0 }}
{{ with resources.GetRemote $file }}
  {{ with .Err }}
    {{ errorf "%s" . }}
  {{ else }}
    {{ $lang := path.Ext $file | strings.TrimPrefix "." }}
    {{ highlight .Content $lang }}
  {{ end }}
{{ else }}
  {{ errorf "Unable to get remote resource." }}
{{ end }}
