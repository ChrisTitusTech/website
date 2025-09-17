---
title: "Track Changes Word Author Macro"

date: 2025-09-17
url: /track-changes-word-author-macro/
image: images/2025-thumbs/track-changes-word-author-macro.webp
categories:
  - Windows
tags:
  - Word 
draft: false
---
This is a method for changing ALL the authors in Microsoft Word to a single author for comments and revisions. 
<!--more-->

## Who is this for?

Businesses and Law Firms that need to change the author before sending changes to a client.

## The Macro and How to Use

Open a New Module in Visual Basic in Word (Alt + F11)

From VB Editor, Create a new Module (Right-click Normal -> Insert -> Module)

![word-macro](/images/2025/word-macro.webp)

Paste the following code into the Normal-Module1 (Code) Window _Note: Big window on the right_

```
Sub AcceptAndRecreateWorkingVersion()
    Dim doc As Document
    Dim rev As Revision
    Dim com As Comment
    Dim originalTrackChanges As Boolean
    Dim revCount As Long
    Dim response As VbMsgBoxResult
    Dim authors As Collection
    Dim author As Variant
    Dim sOldAuthor As String
    Dim sNewAuthor As String
    Dim sec As Section
    Dim hf As HeaderFooter
    Dim sWOOXML As String
    Dim sFindAuthor As String
    Dim sReplaceAuthor As String
    Dim hasChanges As Boolean
    Dim newAuthor As String
  
    'Set Author Name Here
    newAuthor = "New Author"
    
    On Error GoTo ErrorHandler
    Set doc = ActiveDocument
    revCount = doc.Revisions.Count
    
    If revCount = 0 Then
        MsgBox "No tracked changes found.", vbInformation, "No Revisions"
        Exit Sub
    End If
    
    response = MsgBox("Set all tracked changes to '" & newAuthor & "' as author?" & vbNewLine & _
                     "Processes via XML for all types.", vbYesNo + vbQuestion, "Confirm")
    If response = vbNo Then Exit Sub
    
    ' Store settings
    originalTrackChanges = doc.TrackRevisions
    Application.ScreenUpdating = False
    
    ' Collect unique authors excluding newAuthor
    Set authors = New Collection
    hasChanges = False
    For Each rev In doc.Revisions
        If rev.author <> newAuthor Then
            On Error Resume Next
            authors.Add rev.author, rev.author
            If Err.Number = 0 Then hasChanges = True
            On Error GoTo ErrorHandler
        End If
    Next rev
    For Each com In doc.Comments
        If com.author <> newAuthor Then
            On Error Resume Next
            authors.Add com.author, com.author
            If Err.Number = 0 Then hasChanges = True
            On Error GoTo ErrorHandler
        End If
    Next com
    
    If Not hasChanges Then
        MsgBox "No changes to process.", vbInformation, "Complete"
        GoTo CleanUp
    End If
    
    ' Turn off track revisions
    doc.TrackRevisions = False
    
    sNewAuthor = newAuthor
    
    ' Process each unique author
    For Each author In authors
        sOldAuthor = author
        sFindAuthor = "w:author=""" & sOldAuthor & """"
        sReplaceAuthor = "w:author=""" & sNewAuthor & """"
        
        ' Main content
        sWOOXML = doc.Content.WordOpenXML
        sWOOXML = Replace(sWOOXML, sFindAuthor, sReplaceAuthor)
        doc.Content.InsertXML sWOOXML
        
        ' Headers and footers
        For Each sec In doc.Sections
            For Each hf In sec.Headers
                sWOOXML = hf.Range.WordOpenXML
                sWOOXML = Replace(sWOOXML, sFindAuthor, sReplaceAuthor)
                hf.Range.InsertXML sWOOXML
            Next hf
            For Each hf In sec.Footers
                sWOOXML = hf.Range.WordOpenXML
                sWOOXML = Replace(sWOOXML, sFindAuthor, sReplaceAuthor)
                hf.Range.InsertXML sWOOXML
            Next hf
        Next sec
    Next author
    
    doc.Save  ' Save to register changes
    
CleanUp:
    doc.TrackRevisions = originalTrackChanges
    Application.ScreenUpdating = True
    Application.StatusBar = ""
    
    MsgBox "Processed all changes. Remaining revisions: " & doc.Revisions.Count, vbInformation, "Complete"
    Exit Sub

ErrorHandler:
    MsgBox "Error: " & Err.Description, vbCritical, "Error"
    Resume CleanUp
End Sub
```

Save and Return to Word

Open the document you want to apply this to and run the macro with Alt+F8

**Note: You can also bind this to a button on your ribbon/taskbar**
